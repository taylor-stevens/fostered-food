import { MapContainer, TileLayer } from 'react-leaflet';
import '../../index.css';
import SingleFridgeLocationMarker from './SingleFridgeLocationMarker';
import UserLocationButton from './UserLocationButton';
import React, { useContext, useState } from 'react';
import InfoPopupContainer from './InfoPopupContainer';
import DataContext from '../../contexts/DataContext';
import UserNotification from './UserNotification';
import LeafletComponentContainer from './LeafletComponentContainer';
import {
	DEFAULT_MAP_ZOOM as defaultZoom,
	DEFAULT_MAP_CENTER_LEAFLET as defaultCenter,
	DEFAULT_TILE_PROVIDER as tileProvider,
	DEFAULT_MAP_STYLE as mapStyle,
	DEFAULT_DATA_FETCH_FAIL_MSG as dataFailMsg,
} from '../../constants/constants';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import {Fridge} from "../../types/Types";
import {LatLng} from "leaflet";

/**
 * Produces an interactive Leaflet Map with controls and information about community fridges.
 * Relies on DataContext.
 * @returns {JSX.Element} A Leaflet Map, centered around Boston, MA.
 */
export default function Map() {
	// the fridge data from the database
	const data: Fridge[] | undefined = useContext(DataContext);
	// state to keep track of which fridge is selected.
	const [selectedFridge, updateSelected] = useState<Fridge | undefined>(undefined);
	// the state that tells the map the current location of the user, if found (LatLng | undef)
	const [located, updateLocated] = useState<LatLng | undefined>(undefined);
	// the state that tells the map whether to notify the user that their location is unknown.
	const [showAlert, setShowAlert] = useState<boolean>(false);
	/**
	 * decide to display an error message depending on if a user has clicked the
	 * sort button before being located. Nothing is rendered for the alert on default
	 * (application start).
	 */
	let noLocationAlert = <></>;
	if (showAlert) {
		noLocationAlert = (
			<LeafletComponentContainer
				location={'leaflet-top leaflet-middle'}
				contents={
					<UserNotification
						text={
							"Enable Location by clicking the 'My Location' button in the" +
							' upper right hand corner to sort fridges by distance to you.'
						}
						showClose={true}
						closeButtonFunction={setShowAlert}
						closeFunctionValue={false}/>
				}/>
		);
	};
	/**
	 * Determine whether to notify the user of the lack of access to the Fridge data from the database,
	 * or whether to render the Marker's on the Map alongside the information container.
	 */
	let dataOrAlert = <></>;
	if (data) {
		dataOrAlert = (
			<>
				{data.map((fridge) => (
					<SingleFridgeLocationMarker
						key={fridge.address}
						fridge={fridge}
						updateSelected={updateSelected}/>
				))}
				<LeafletComponentContainer
					location={'leaflet-bottom leaflet-left'}
					contents={
						<InfoPopupContainer
							setShowAlert={setShowAlert}
							located={located}
							updateSelected={updateSelected}/>
					}/>
				{noLocationAlert}
			</>
		);
	} else {
		dataOrAlert = (
			<LeafletComponentContainer
				location={'leaflet-top leaflet-middle'}
				contents={
					<UserNotification
						text={dataFailMsg}
						showClose={false}/>
				}/>
		);
	}

	return (
		<div aria-label={'mapContainer'}>
			<MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true}>
				<SelectedFridgeContext.Provider value={selectedFridge}>
					<div aria-label={'tileLayer'}><TileLayer attribution={tileProvider} url={mapStyle}/></div>
					<LeafletComponentContainer
						location={'leaflet-top leaflet-right'}
						className={'leaflet-bar'}
						contents={
							<UserLocationButton text={'My Location'}
												located={located}
												updateLocated={updateLocated}
												setShowAlert={setShowAlert}/>
						}/>
					{dataOrAlert}
				</SelectedFridgeContext.Provider>
			</MapContainer>
		</div>
	);
}

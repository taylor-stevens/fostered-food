import {MapContainer} from 'react-leaflet';
import '../../index.css';
import React, {useContext, useEffect, useState} from 'react';
import InfoPopupContainer from './InfoPopupContainer';
import {
	DEFAULT_MAP_ZOOM as defaultZoom,
	DEFAULT_MAP_CENTER_LEAFLET as defaultCenter,
} from '../../constants/constants';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import { Fridge } from '../../types/Types';
import { LatLng } from 'leaflet';
import {Container, Row} from "react-bootstrap";
import MapLogic from "./MapLogic";

/**
 * Produces an interactive Leaflet Map with controls and information about community fridges.
 * Relies on DataContext.
 * @returns {JSX.Element} A Leaflet Map, centered around Boston, MA.
 */
export default function Map() {
	// state to keep track of which fridge is selected.
	const [selectedFridge, updateSelected] = useState<Fridge | undefined>(undefined);
	// the state that tells the map the current location of the user, if found (LatLng | undef)
	const [located, updateLocated] = useState<LatLng | undefined>(undefined);
	// the state that tells the map whether to notify the user that their location is unknown.
	const [showAlert, setShowAlert] = useState<boolean>(false);

	const [zoomingMap, setZoomingMap] = useState<boolean>(false);
	const [zoomingTo, setZoomingTo] = useState<[any, any]>([undefined, undefined]);

	const zoomMap: any = (xLocation: any, yLocation: any): any => {
		setZoomingTo([xLocation, yLocation]);
		setZoomingMap(true);
	};

	return (
		<SelectedFridgeContext.Provider value={selectedFridge}>
			<Container fluid aria-label={'mapContainer'} style={{position: 'absolute', width: '100vw', height: '100%'}}>
				<Row style={{position: 'fixed', zIndex: 9}}>
					<InfoPopupContainer
						zoomMap={zoomMap}
						setShowAlert={setShowAlert}
						located={located}
						updateSelected={updateSelected}/>
				</Row>
				<Row style={{top: '0px', left: '0px', width: 'inherit', zIndex: 0, position: 'relative'}}>
					<MapContainer
						center={defaultCenter}
						zoom={defaultZoom}
						scrollWheelZoom={true}
						style={{width: '100%', zIndex: 0}}>
						<MapLogic
							located={located}
							updateLocated={updateLocated}
							setShowAlert={setShowAlert}
							updateSelected={updateSelected}
							showAlert={showAlert}
							zoomingMap={zoomingMap}
							zoomingTo={zoomingTo}
							setZoomingMap={setZoomingMap}/>
					</MapContainer>
				</Row>
			</Container>
		</SelectedFridgeContext.Provider>
	);
}

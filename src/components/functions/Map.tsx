import { MapContainer } from 'react-leaflet';
import '../../index.css';
import React, { Dispatch, SetStateAction, useState } from 'react';
import InfoPopupContainer from './InfoPopupContainer';
import {
	DEFAULT_MAP_ZOOM as defaultZoom,
	DEFAULT_MAP_CENTER_LEAFLET as defaultCenter,
} from '../../constants/constants';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import { Fridge } from '../../types/Types';
import { LatLng } from 'leaflet';
import {Container, Row, Toast} from 'react-bootstrap';
import MapLogic from './MapLogic';
import { BsCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs';
import { todaysDateShortened } from '../../utils/utils';
import UserLocationButton from './UserLocationButton';

/**
 * Produces an interactive Leaflet Map with controls and information about community fridges.
 * Relies on DataContext.
 * @returns {JSX.Element} A Leaflet Map, centered around Boston, MA.
 */
export default function Map(
	props: {
		updateData: Dispatch<SetStateAction<Fridge[] | undefined>>
	}
) {
	// acknowledge the incoming parameters
	const updateData = props.updateData;

	/**
	 * The Application States to Keep Track of
	 */
	// which fridge is selected.
	const [selectedFridge, setSelectedFridge] = useState<Fridge | undefined>(undefined);
	// current location of the user, if found (LatLng | undef)
	const [located, updateLocated] = useState<LatLng | undefined>(undefined);
	// tells the map whether the user is currently being located
	const [locating, updateLocating] = useState(false);
	// whether to notify the user that their location is unknown.
	const [showAlert, setShowAlert] = useState<boolean>(false);
	// whether to show the toast alerting success of the sorting
	const [showToast, setShowToast] = useState<string | undefined>(undefined);
	// if the location to zoom to is in progress
	const [zoomingMap, setZoomingMap] = useState<boolean>(false);
	// the location to pan to
	const [zoomingTo, setZoomingTo] = useState<[any, any]>([undefined, undefined]);

	/**
	 * Sets the states of the zooming variables to initiate the re-render of the map to the
	 * given location.
	 * @param xLocation the x-coordinate of the location the map is panning to
	 * @param yLocation the y-coordinate of the location the map is panning to
	 */
	const zoomMap: any = (xLocation: any, yLocation: any): any => {
		setZoomingTo([xLocation, yLocation]);
		setZoomingMap(true);
	};

	return (
		<SelectedFridgeContext.Provider value={selectedFridge}>
			<Container fluid aria-label={'mapContainer'} style={{position: 'absolute', width: '100vw', height: '100%'}}>
				<Row style={{position: 'fixed', zIndex: 9, top: '10px', left: '50px'}}>
					<UserLocationButton
						text={'My Location'}
						located={located}
						locating={locating}
						updateLocating={updateLocating}
						setShowAlert={setShowAlert}/>
				</Row>
				<Row style={{position: 'fixed', zIndex: 9}}>
					<InfoPopupContainer
						updateData={updateData}
						zoomMap={zoomMap}
						setShowAlert={setShowAlert}
						located={located}
						setSelectedFridge={setSelectedFridge}
						setShowToast={setShowToast}
					/>
				</Row>
				<Row style={{position: 'fixed', zIndex: 9, top: '100px', left: '25px'}}>
					<Toast style={{padding: '0px'}} bg={'light'} onClose={() => setShowToast(undefined)}
						   show={!!showToast} delay={6000} autohide>
						<Toast.Header style={{width: '100%'}}>
							<BsCheckSquareFill/>
							<strong className="me-auto" style={{paddingLeft: '5px'}}>Success!</strong>
							<small>{todaysDateShortened()}</small>
						</Toast.Header>
						<Toast.Body>{showToast}</Toast.Body>
					</Toast>
				</Row>
				<Row style={{position: 'fixed', zIndex: 9,  top: '100px', left: '25px'}}>
					<Toast style={{padding: '0px'}} bg={'light'}
						   show={locating} delay={6000} autohide>
						<Toast.Header style={{width: '100%'}}>
							<BsCheckSquareFill/>
							<strong className="me-auto" style={{paddingLeft: '5px'}}>Success!</strong>
							<small>{todaysDateShortened()}</small>
						</Toast.Header>
						<Toast.Body>
							{'Thank you for your patience with the wait time duration '
							+ 'of the free locating services Fostered Food uses'}
						</Toast.Body>
					</Toast>
				</Row>
				<Row style={{position: 'fixed', zIndex: 9,  top: '100px', left: '25px'}}>
					<Toast style={{padding: '0px'}} bg={'light'} onClose={() => setShowAlert(false)}
						   show={showAlert} delay={9000} autohide>
						<Toast.Header style={{width: '100%'}}>
							<BsFillXSquareFill/>
							<strong className="me-auto" style={{paddingLeft: '5px'}}>Can't Sort List</strong>
							<small>{todaysDateShortened()}</small>
						</Toast.Header>
						<Toast.Body>
							{
								'To sort the fridges by distance to your current location, ' +
								'enable location services by clicking the My Location button located in the ' +
								'upper left hand corner of the web page.'
							}
						</Toast.Body>
					</Toast>
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
							locating={locating}
							updateLocating={updateLocating}
							setSelectedFridge={setSelectedFridge}
							zoomingMap={zoomingMap}
							setZoomingMap={setZoomingMap}
							zoomingTo={zoomingTo}/>
					</MapContainer>
				</Row>
			</Container>
		</SelectedFridgeContext.Provider>
	);
}

import { MapContainer } from 'react-leaflet';
import '../../index.css';
import React, { useState } from 'react';
import InfoPopupContainer from './InfoPopupContainer';
import {
	DEFAULT_MAP_ZOOM as defaultZoom,
	DEFAULT_MAP_CENTER_LEAFLET as defaultCenter,
} from '../../constants/constants';
import { SelectedFridgeProvider } from '../../contexts/SelectedFridgeContext';
import {UserLocationProvider} from "../../contexts/UserLocationContext";
import { CustomToast } from '../../types/Types';
import { Container, Row, Toast } from 'react-bootstrap';
import MapLogic from './MapLogic';
import { BsCheckSquareFill, BsFillXSquareFill, BsThreeDots } from 'react-icons/bs';
import { todaysDateShortened } from '../../utils/utils';
import UserLocationButton from './UserLocationButton';

/**
 * Produces an interactive Leaflet Map with controls and information about community fridges.
 * Relies on DataContext.
 * @returns {JSX.Element} A Leaflet Map, centered around Boston, MA.
 */
export default function Map() {
	// acknowledge the incoming parameters

	/**
	 * The Application States to Keep Track of
	 */
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

	const allToasts: CustomToast[] = [
		{
			// toast that lets a user know that they have successfully sorted the fridges with the dropdown
			show: !!showToast,
			icon: <BsCheckSquareFill/>,
			heading: 'Success!',
			body: showToast || '',
			onClose: () => setShowToast(undefined),
		},
		{
			// toast that notifies users that there might be a delay with the location services
			show: locating,
			icon: <BsThreeDots/>,
			heading: 'Locating',
			body: 'Thank you for your patience with the wait time ' +
				'of the free locating services Fostered Food uses',
		},
		{
			// toast that lets a user know that their location is not known, and therefor they cannot sort the
			// fridges by their distance to them
			show: showAlert,
			icon: <BsFillXSquareFill/>,
			heading: 'Can\'t Sort List',
			body: 'To sort the fridges by distance to your current location, ' +
				'enable location services by clicking the My Location button located in the ' +
				'upper left hand corner of the web page.',
			onClose: () => setShowAlert(false),
			delay: 9000
		}
	];

	return (
		<SelectedFridgeProvider>
			<UserLocationProvider>
				<Container fluid aria-label={'mapContainer'} className={'mapContainer'}>
					<div className={'mapContainerToastOverlay'}>
						<Row style={{position: 'fixed', top: '10px', left: '50px'}}>
							<UserLocationButton locating={locating} updateLocating={updateLocating}
												setShowAlert={setShowAlert}/>
						</Row>
						<div className={'popupContainerRow'}>
							<Row>
								<InfoPopupContainer zoomMap={zoomMap} setShowAlert={setShowAlert}
													setShowToast={setShowToast}/>
							</Row>
						</div>
						{ allToasts.map(toast => <Row id={toast.heading}>{createToast(toast)}</Row>) }
					</div>
					<div className={'mapInformation'}>
						<Row>
							<MapContainer
								center={defaultCenter}
								zoom={defaultZoom}
								scrollWheelZoom={true}>
								<MapLogic
									locating={locating}
									updateLocating={updateLocating}
									zoomingMap={zoomingMap}
									setZoomingMap={setZoomingMap}
									zoomingTo={zoomingTo}/>
							</MapContainer>
						</Row>
					</div>
				</Container>
			</UserLocationProvider>
		</SelectedFridgeProvider>
	);
}

/**
 * Renders a Bootstrap toast with a designated light background, small text with today's date,
 * and a default delay of 6000 units.
 * @param toast { CustomToast } the onClose function to call if needed, the boolean that tells
 * 				the toast when to appear, a different delay, if desired, an icon for the upper
 * 				left corner, and text for the bold heading and Toast body.
 * 	TODO: write tests for this function
 */
function createToast( toast: CustomToast ) {
	return (
		<Toast style={{padding: '0px'}} bg={'light'} onClose={toast.onClose || (() => {})}
			   show={toast.show} delay={toast.delay || 6000} autohide>
			<Toast.Header>
				{toast.icon}
				<strong className="me-auto" style={{paddingLeft: '5px'}}>{toast.heading}</strong>
				<small>{todaysDateShortened()}</small>
			</Toast.Header>
			<Toast.Body>{toast.body}</Toast.Body>
		</Toast>
	);
}

import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { Marker } from 'react-leaflet';
import {
	CLICKED_LOCATION_MARKER as redMarker,
	DEFAULT_LOCATION_MARKER as blackMarker,
} from '../../constants/constants';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import SingleFridgeLocationPopup from './SingleFridgeLocationPopup';
import { Fridge } from '../../types/Types';
import { LatLng } from 'leaflet';

/**
 * A marking on the Map representing the location of a single community {@link Fridge}.
 * Relies on the SelectedFridgeContext to determine the Marker location.
 * @returns {JSX.Element} A Marker with a Popup that describes this Fridge.
 */
export default function SingleFridgeLocationMarker(
	props: {
		setSelectedFridge: Dispatch<SetStateAction<Fridge | undefined>>; // updates the currently selected Fridge
		fridge: Fridge | undefined; // the Fridge that this Marker represents
	}
) {
	// acknowledge the incoming parameters
	const setSelectedFridge = props.setSelectedFridge;
	const thisFridge = props.fridge;

	// the currently selected Fridge, based on the contexts
	const selectedFridge = useContext(SelectedFridgeContext);

	// changes the Marker's icon when clicked
	const [clickedMarker, setClickedMarker] = useState(false);

	// the location of the Fridge that this Marker represents
	let thisLocation;
	let markerOrNone = <></>;

	// when this marker is clicked, update the currently selected Fridge to be this Fridge.
	const markerClicked = useMemo(() => ({
			click() { setSelectedFridge(thisFridge); }}),
		[thisFridge, setSelectedFridge]
	);

	// checks whether this Marker has been selected according to the Map and changes state accordingly
	useEffect(() => {
		setClickedMarker(
			selectedFridge !== null &&
			selectedFridge !== undefined &&
			thisFridge !== null && thisFridge !== undefined &&
			thisFridge.location === selectedFridge.location);
	}, [selectedFridge, thisFridge]);

	if (thisFridge) {
		// the location of the Fridge that this Marker represents
		thisLocation = thisFridge.location;
		markerOrNone = (
			<div aria-label={'singleFridgeLocationMarker'}>
				<Marker
					position={new LatLng(thisLocation[0], thisLocation[1])}
					// determine whether this location should display as a clicked icon
					icon={clickedMarker ? redMarker: blackMarker}
					eventHandlers={markerClicked}
					key={thisLocation[1]}>
					<SingleFridgeLocationPopup fridge={thisFridge} />
				</Marker>
			</div>
		)
	}

	return (markerOrNone);
}

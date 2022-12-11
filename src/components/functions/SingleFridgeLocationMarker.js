import { useContext, useEffect, useMemo, useState } from 'react';
import { Marker } from 'react-leaflet';
import {
	CLICKED_LOCATION_MARKER as redMarker,
	DEFAULT_LOCATION_MARKER as blackMarker,
} from '../../constants/constants';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import SingleFridgeLocationPopup from './SingleFridgeLocationPopup';

/**
 * A marking on the Map representing the location of a single community {@link Fridge}.
 * Relies on the SelectedFridgeContext to determine the Marker location.
 * @param props will include at least a value for updateSelected, a function that allows the state
 *              of the currently selected Fridge to be changed; and a value for
 *              fridge, which is the Fridge that this Location Marker represents.
 * @returns {JSX.Element} A Marker with a Popup that describes this Fridge.
 */
export default function SingleFridgeLocationMarker(props) {
	// the state function that updates the currently selected Fridge
	const updateSelectedFridge = props.updateSelected;
	// the currently selected Fridge
	const selectedFridge = useContext(SelectedFridgeContext);
	// changes the Marker's icon when clicked
	const [clickedMarker, setClickedMarker] = useState(false);
	// the Fridge that this Marker represents
	const thisFridge = props.fridge;
	// the location of the Fridge that this Marker represents
	let thisLocation;
	let markerOrNone = <></>;

	// when this marker is clicked, update the currently selected Fridge to be this Fridge.
	const markerClicked = useMemo(() => ({
			click() { updateSelectedFridge(thisFridge); },}),
		[thisFridge, updateSelectedFridge]
	);

	// checks whether this Marker has been selected according to the Map and changes state accordingly
	useEffect(() => {
		setClickedMarker(
			selectedFridge !== null &&
			selectedFridge !== undefined &&
			thisFridge !== null &&
			thisFridge.location === selectedFridge.location);
	}, [selectedFridge, thisFridge]);

	if (thisFridge) {
		// the location of the Fridge that this Marker represents
		thisLocation = thisFridge.location;
		markerOrNone = (
			<div aria-label={'singleFridgeLocationMarker'}>
				<Marker
					position={thisLocation}
					// determine whether this location should display as a clicked icon
					icon={clickedMarker ? redMarker: blackMarker}
					eventHandlers={markerClicked}
					key={thisLocation}>
					<SingleFridgeLocationPopup fridge={thisFridge} />
				</Marker>
			</div>
		)
	}

	return (markerOrNone);
}

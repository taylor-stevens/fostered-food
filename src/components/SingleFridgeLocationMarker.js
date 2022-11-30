import { useContext, useEffect, useMemo, useState } from 'react';
import { Marker } from 'react-leaflet';
import {
	CLICKED_LOCATION_MARKER as clickedMarker,
	DEFAULT_LOCATION_MARKER as locationMarker,
} from '../constants/constants';
import SelectedFridgeContext from '../contexts/SelectedFridgeContext';
import SingleFridgeLocationPopup from './SingleFridgeLocationPopup';

/**
 * A marking on the Map representing the location of a single community Fridge.
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
	// the location of the currently selected Fridge, if there is one
	const selectedLocation = selectedFridge?.location;
	// the Fridge that this Marker represents
	const thisFridge = props.fridge;
	// the location of the Fridge that this Marker represents
	const thisLocation = thisFridge.location;
	// changes the Marker's icon when clicked
	const [isSelected, locationClicked] = useState(false);
	// determine whether this location should display as a clicked icon
	const icon = isSelected ? clickedMarker : locationMarker;

	// when this marker is clicked, update the currently selected Fridge to be this Fridge.
	const markerClicked = useMemo(
		() => ({
			click() {
				updateSelectedFridge(thisFridge);
			},
		}),
		[thisFridge, updateSelectedFridge]
	);

	// checks whether this Marker has been selected according to the Map and changes state accordingly
	useEffect(() => {
		locationClicked((selectedFridge !== null && thisLocation === selectedLocation));
	}, [selectedFridge, thisFridge]);

	return (
		<Marker
			position={thisLocation}
			icon={icon}
			eventHandlers={markerClicked}
			key={thisLocation}
			aria-label={'singleFridgeLocationMarker'}>
			<SingleFridgeLocationPopup fridge={thisFridge} />
		</Marker>
	);
}

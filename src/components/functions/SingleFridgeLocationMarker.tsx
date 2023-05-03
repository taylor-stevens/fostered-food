import { useEffect, useMemo, useState } from 'react';
import { Marker } from 'react-leaflet';
import {
	CLICKED_LOCATION_MARKER as redMarker,
	DEFAULT_LOCATION_MARKER as blackMarker,
} from '../../constants/constants';
import {useSelectedFridgeContext} from '../../contexts/SelectedFridgeContext';
import { Fridge } from '../../types/Types';
import { LatLng } from 'leaflet';

/**
 * A marking on the Map representing the location of a single community {@link Fridge}.
 * Relies on the SelectedFridgeContext to determine the Marker location.
 * @returns {JSX.Element} A Marker with a Popup that describes this Fridge.
 */
export default function SingleFridgeLocationMarker(
	props: {
		fridge: Fridge | undefined; // the Fridge that this Marker represents
	}
) {
	// acknowledge the incoming parameters
	const thisFridge = props.fridge;

	// the currently selected Fridge, based on the contexts
	const [selected, setSelected] = useSelectedFridgeContext();

	// changes the Marker's icon when clicked
	const [clickedMarker, setClickedMarker] = useState(blackMarker);

	// the location of the Fridge that this Marker represents
	let thisLocation;
	let markerOrNone = <></>;

	// when this marker is clicked, update the currently selected Fridge to be this Fridge.
	const markerClicked = useMemo(() => ({
			click() { setSelected({fridge: thisFridge}); }}),
		[thisFridge, setSelected]
	);

	// checks whether this Marker has been selected according to the Map and changes state accordingly
	useEffect(() => {
		setClickedMarker(thisFridge?.address === selected.fridge?.address ? redMarker : blackMarker);
	}, [selected.fridge, thisFridge]);

	if (thisFridge) {
		// the location of the Fridge that this Marker represents
		thisLocation = thisFridge.location;
		markerOrNone = (
			<div aria-label={'singleFridgeLocationMarker'}>
				<Marker
					position={new LatLng(thisLocation[0], thisLocation[1])}
					// determine whether this location should display as a clicked icon
					icon={clickedMarker}
					eventHandlers={markerClicked}
					key={thisLocation[1]}/>
			</div>
		)
	}

	return (markerOrNone);
}

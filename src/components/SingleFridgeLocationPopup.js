import React from 'react';
import { Popup } from 'react-leaflet';

/**
 * Creates an information bubble for a location Marker corresponding to a given Fridge.
 * @param props will include at least a value for fridge, the Fridge that this Popup corresponds to
 * @returns {JSX.Element} A Leaflet Popup describing the given Fridge's information.
 */
export default function SingleFridgeLocationPopup(props) {
	// the Fridge that corresponds to this location that the Popup is at
	const thisFridge = props.fridge;
	// the name of the Fridge that the Popup is being rendered for
	const thisName = thisFridge.name;
	// the location of the Fridge that the Popup is being rendered for
	const thisLocation = thisFridge.location;

	return (
		<Popup  aria-label={'singleFridgeLocationPopup'}>
			This is the:
			<div style={{ fontWeight: 'bold' }}>{thisName}</div>
			Located at: <br />
			<div style={{ fontWeight: 'bold' }}>{thisLocation}</div>
		</Popup>
	);
}

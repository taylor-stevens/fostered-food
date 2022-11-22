import React from 'react';
import { Popup } from 'react-leaflet';

/**
 * Creates an information bubble for a location marker corresponding to a given fridge.
 * @param props will include at least a value for fridge, the fridge that this Popup corresponds to
 * @returns {JSX.Element} - A Leaflet Popup describing the given fridge's information.
 */
export default function SingleFridgeLocationPopup(props) {
	const thisFridge = props.fridge; // the fridge that corresponds to this location

	return (
		<Popup>
			This is the:
			<div style={{ fontWeight: 'bold' }}>{thisFridge.name}</div>
			Located at: <br />
			<div style={{ fontWeight: 'bold' }}>{thisFridge.location}</div>
		</Popup>
	);
}

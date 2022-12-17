import React from 'react';
import { Popup } from 'react-leaflet';
import { Fridge } from '../../types/Types';

/**
 * Creates an information bubble for a location Marker corresponding to a given Fridge.
 * @returns {JSX.Element} A Leaflet Popup describing the given Fridge's information.
 */
export default function SingleFridgeLocationPopup(
	props: {
		fridge: Fridge | undefined; // the Fridge that corresponds to this location that the Popup is at
	}
) {
	// acknowledge the incoming parameters
	const thisFridge = props.fridge;

	const popupOrNone = !thisFridge ? <></> : (
		<div aria-label={ 'singleFridgeLocationPopup' }>
			<Popup>
				This is the:
				<div style={{ fontWeight: 'bold' }}>{ thisFridge.name }</div>
				Located at: <br />
				<div style={{ fontWeight: 'bold' }}>{ thisFridge.address }</div>
			</Popup>
		</div>
	);

	return (popupOrNone);
}

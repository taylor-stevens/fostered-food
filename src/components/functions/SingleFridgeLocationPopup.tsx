import React from 'react';
import { Popup } from 'react-leaflet';
import { Fridge } from '../../types/Types';

/**
 * Creates an information bubble for a location Marker corresponding to a given Fridge.
 * @param props will include at least a value for fridge, the Fridge that this Popup corresponds to
 * @returns {JSX.Element} A Leaflet Popup describing the given Fridge's information.
 */
export default function SingleFridgeLocationPopup(
	props: { fridge: Fridge | undefined; }
) {
	// the Fridge that corresponds to this location that the Popup is at
	const thisFridge = props.fridge;
	let popupOrNone = <></>;
	if (thisFridge) {
		// the name of the Fridge that the Popup is being rendered for
		const thisName = thisFridge.name;
		// the location of the Fridge that the Popup is being rendered for
		const thisLocation = thisFridge.address;
		popupOrNone = (
			<div aria-label={'singleFridgeLocationPopup'}>
				<Popup>
					This is the:
					<div style={{ fontWeight: 'bold' }}>{thisName}</div>
					Located at: <br />
					<div style={{ fontWeight: 'bold' }}>{thisLocation}</div>
				</Popup>
			</div>
		)
	}

	return (popupOrNone);
}

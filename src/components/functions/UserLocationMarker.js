import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { USER_LOCATION_MARKER as userLocationMarker } from '../../constants/constants';

/**
 * Creates a Marker that corresponds to the user's location.
 * @param props will include at least a value for position (the location of the user).
 * @returns {null|JSX.Element} A Marker representing the user's current location.
 */
export default function UserLocationMarker(props) {
	// the location of the current user, found by Leaflet.
	const userPosition = props.position;
	// determine whether to render the user's location Marker
	let markerOrNone = <></>;
	if (userPosition) {
		markerOrNone = (
			<div aria-label={'userLocationMarker'}>
				<Marker position={userPosition} icon={userLocationMarker}>
					<Popup>You Are Here</Popup>
				</Marker>
			</div>
		);
	}
	return <>{markerOrNone}</>;
}

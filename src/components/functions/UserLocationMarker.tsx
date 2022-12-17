import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { USER_LOCATION_MARKER as userLocationMarker } from '../../constants/constants';
import { LatLng } from 'leaflet';

/**
 * Creates a Marker that corresponds to the user's location.
 * @returns {null|JSX.Element} A Marker representing the user's current location.
 */
export default function UserLocationMarker(
	props: {
		position: LatLng | undefined; // the location of the current user, found by Leaflet.
	}
) {
	// acknowledge the incoming parameters
	const userPosition = props.position;

	// determine whether to render the user's location Marker
	const markerOrNone = !userPosition ? <></> : (
		<div aria-label={'userLocationMarker'}>
			<Marker position={userPosition} icon={userLocationMarker}>
				<Popup>You Are Here</Popup>
			</Marker>
		</div>
	);

	return <>{markerOrNone}</>;
}

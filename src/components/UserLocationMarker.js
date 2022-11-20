import React from "react";
import {Marker, Popup} from "react-leaflet";
import {
    USER_LOCATION_MARKER as userLocationMarker
} from "../constants/constants";

/**
 * Creates a Marker that corresponds to the users location.
 * @param props will include at least a value for position, the location of the user of the application.
 * @returns {null|JSX.Element} A marker representing the user's current location.
 */
export default function UserLocationMarker(props) {

    const userPosition = props.position; // the location of the current user, found by Leaflet.

    return userPosition === null ? null : (
        <Marker position={userPosition} icon={userLocationMarker}>
            <Popup>
                You Are Here
            </Popup>
        </Marker>
    )
}
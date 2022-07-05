import React from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import * as leaflet from "leaflet";
import myLocation from "../images/myLocation.png";

/**
 * Brings the user to the location of their viewing device and shows their location with a marker.
 * @param position - leaflet's return from location function to detemine where the current device viewing the map is.
 * @returns {null|JSX.Element} - A marker of the user's current location after zooming to that location.
 */
export default function MyLocation({position}) {

    const myLoc = leaflet.icon({
        iconUrl: myLocation,
        iconSize: [45, 67.5],
    })

    return position === null ? null : (
        <Marker position={position} icon={myLoc}>
            <Popup>You Are Here</Popup>
        </Marker>
    )
}
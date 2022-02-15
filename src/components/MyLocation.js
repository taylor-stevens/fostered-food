import React, {useMemo, useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import * as leaflet from "leaflet";
import myLocation from "../images/myLocation.png";

/**
 * Brings the user to the location of their viewing device and shows their location with a marker.
 * @returns {null|JSX.Element} A marker of the user's current location after zooming to that location.
 */
export default function MyLocation() {

    const [position, setPosition] = useState(null)

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

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
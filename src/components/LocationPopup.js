import React from "react";
import {Popup} from "react-leaflet";

/**
 * Creates an information bubble for a location marker.
 * @param data {JSON} - Information regarding a single fridge.
 * @returns {JSX.Element} - A Leaflet Popup.
 */
export default function LocationPopup(props) {
    return (<Popup>
                This is the {props.data.name} <br /> Located at {props.data.address}
            </Popup>
    )
}

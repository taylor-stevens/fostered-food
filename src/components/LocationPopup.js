import React from "react";
import {Popup} from "react-leaflet";

/**
 * Creates an information bubble for a location marker.
 * @param data - A single fridge from the fridges JSON.
 * @returns An element with the _data_ fridge's information.
 */
function LocationPopup(props) {
    return (<Popup>
                This is the {props.data.name} <br /> Located at {props.data.address}
            </Popup>
    )
}

export default LocationPopup
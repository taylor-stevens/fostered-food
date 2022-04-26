import React from "react";
import {Popup} from "react-leaflet";

/**
 * Creates an information bubble for a location marker.
 * @param data - A single fridge from the fridges JSON.
 * @returns An element with the _data_ fridge's information.
 */
function LocationPopup({data}) {
    return (<Popup>
                This is the {data.name} <br /> Located at {data.address}
            </Popup>
    )
}

export default LocationPopup
import React from "react";
import {Popup} from "react-leaflet";

/**
 * Creates an information bubble for a location marker.
 * @param {JSON} data - A single fridge from the fridges JSON.
 * @returns {JSX.Element} An element with the _data_ fridge's information.
 */
function LocationPopup({data}) {
    return (<Popup>
                <div>
                    This is the {data.name} <br /> Located at {data.address}
                </div>
            </Popup>
    )
}

export default LocationPopup
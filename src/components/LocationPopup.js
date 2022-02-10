import React from "react";
import {Popup} from "react-leaflet";

/*
 * Creates an information bubble for a location marker.
 * data - a single fridge from the fridges JSON
 * return - a <Popup> div with the _data_ fridge's information
 */
function LocationPopup({data}) {
    //<image src={infoArrrow} height={50} width={50}/>
    return (<Popup>
                <div>
                    This is the {data.name} <br /> Located at {data.address}
                </div>
            </Popup>
    )
}

export default LocationPopup
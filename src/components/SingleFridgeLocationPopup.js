import React, {useContext} from "react";
import {Popup} from "react-leaflet";
import DataContext from "../contexts/DataContext";

/**
 * Creates an information bubble for a location marker.
 * @param data {JSON} - Information regarding a single fridge.
 * @returns {JSX.Element} - A Leaflet Popup.
 */
export default function SingleFridgeLocationPopup(props) {

    const fridgeName = props.name;
    const fridgeLocation = props.location;

    return (
        <Popup>
            This is the:
            <div style={{fontWeight: 'bold'}}>
                {fridgeName}
            </div>
            Located at: <br/>
            <div style={{fontWeight: 'bold'}}>
                {fridgeLocation}
            </div>
        </Popup>
    )
}

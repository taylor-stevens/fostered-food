import React, {useRef, useState} from "react";
import Button from 'react-bootstrap/Button'
import MyLocation from "./MyLocation";
import "../index.css"
import {useMapEvents} from "react-leaflet";

/**
 * Buttons layered over the map to give the user control of the data view.
 * @returns {JSX.Element} A button that provides a specific map control.
 */
function MapControls({icon, text, position}) {

    const [userLocationVisible, setUserLocation] = useState(false);
    const [userPosition, setUserPosition] = useState(null)

    const map = useMapEvents({
        locationfound(e) {
            setUserPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    const buttonClicked = () => {
        map.locate()
        setUserLocation(true)
    }

    return (
        <div className={position}>
        <div className="leaflet-control leaflet-bar">
            <Button  type="button" className="btn btn-light" onClick={buttonClicked}>
                {icon} {text}
                {userLocationVisible ? <MyLocation position={userPosition}/> : <></>}
            </Button>
        </div>
    </div>)
}

export default MapControls
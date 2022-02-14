import React from "react";
import Button from 'react-bootstrap/Button'
import { BsFillCursorFill } from "react-icons/bs"
import MyLocation from "./MyLocation";
import"../index.css"

/**
 * Buttons layered over the map to give the user control of the data view.
 * @returns {JSX.Element} A button that provides a specific map control.
 */
function MapControls({icon, text, position}) {
    return (<div className={position}>
        <div className="leaflet-control leaflet-bar">
            <Button  type="button" className="btn btn-light" onClick={MyLocation()}>
                {icon} {text}
            </Button>
        </div>
    </div>)
}

export default MapControls
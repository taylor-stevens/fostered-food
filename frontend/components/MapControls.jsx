import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import MyLocation from "./MyLocation";
import "../index.css"
import {useMapEvents} from "react-leaflet";

/**
 * A Button that allows a user to find their current location.
 * @param icon {icon} - The desired image of the location button.
 * @param text {string} - The desired text associated with the button.
 * @param position {string} - The leaflet position that decides where on the leaflet map the button will be.
 * @returns {JSX.Element} - A Location Button.
 */
export default function MapControls(props) {

    const [userLocationVisible, setUserLocation] = useState(false);
    const [userPosition, setUserPosition] = useState(null)

    const map = useMapEvents({
        locationfound(e) {
            setUserPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            props.updateLocating(false)
            props.updateLocated(e.latlng)
        },
    })

    const buttonClicked = () => {
        props.updateLocating(true)
        props.toggleAlert(false)
        map.locate()
        setUserLocation(true)
    }

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <Button  type="button" className="btn btn-light" onClick={buttonClicked}>
                    {props.icon} {props.text}
                    {userLocationVisible ? <MyLocation position={userPosition}/> : <></>}
                </Button>
            </div>
        </div>
    )
}
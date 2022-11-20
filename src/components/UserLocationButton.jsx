import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import UserLocationMarker from "./UserLocationMarker";
import "../index.css"
import {useMapEvents} from "react-leaflet";

/**
 * A Button that allows a user to find their current location.
 * @param props will include at least a value for updateLocating, a function to notify user
 *              their location is being sought; a value for updateLocated, a state updater
 *              that holds the current user location; a value for toggleAlert, a state updater
 *              that determines whether to notify the user that their location is unknown;
 *              a value for icon, the icon to be displayed on this button; and a value for
 *              text, the text to be displayed on this button.
 * @returns {JSX.Element} - A Location Button.
 */
export default function UserLocationButton(props) {

    const updateLocatingUser = props.updateLocating; // function to notify user their location is being sought.
    const updateUserLocation = props.updateLocated; // state updater that holds the current user location
    const alertUserNotFound = props.toggleAlert; // state updater that determines whether to notify
                                                 // the user that their location is unknown.
    const locationIcon = props.icon; // the icon to be displayed on this button
    const locationButtonText = props.text; // the text to be displayed on this button
    const [userLocationVisible, setUserLocation] = useState(false); // state that determines whether
                                                                              // to display a marker for the
                                                                              // current user's location.
    const [userPosition, setUserPosition] = useState(null) // the state that will hold the current
                                                                     // location of the user.

    // provides the currently displayed map for the button so that when clicked, the map can zoom to the
    // current users found location.
    const map = useMapEvents({
        locationfound(e) {
            const userLocation = e.latlng; // where the user is determined to be
            setUserPosition(userLocation)
            map.flyTo(userLocation, map.getZoom()) // move map view to center on the user
            updateLocatingUser(false) // no longer looking for location
            updateUserLocation(userLocation)
        },
    })

    // attempt to locate the current user using Leaflets locate function which will be
    // caught by Leaflets locationfound function above.
    const locateCurrentUser = () => {
        updateLocatingUser(true) // looking for user location
        alertUserNotFound(false) // hide unknown location alert
        map.locate() // location the user
        setUserLocation(true) // user found
    }

    return (
        <Button type="button" className="btn btn-light" onClick={locateCurrentUser}>
            {locationIcon}
            {" "}
            {locationButtonText}
            {
                userLocationVisible ?
                    <UserLocationMarker position={userPosition}/> :
                    <></>
            }
        </Button>
    )
}

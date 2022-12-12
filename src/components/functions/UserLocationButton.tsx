import React, {Dispatch, SetStateAction, useState} from "react";
import Button from 'react-bootstrap/Button'
import UserLocationMarker from "./UserLocationMarker";
import "../../index.css"
import {useMapEvents} from "react-leaflet";
import {BsFillCursorFill} from "react-icons/bs";
import {Spinner} from "react-bootstrap";
import {LatLng} from "leaflet";

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
export default function UserLocationButton(
    props: {
        located: LatLng | undefined;
        updateLocated: Dispatch<SetStateAction<LatLng | undefined>>;
        setShowAlert: Dispatch<SetStateAction<boolean>>;
        text: string;
    }
) {
    // the current location of the application user, if it exists
    const userLocation = props.located;
    // state updater of the state that holds the current user location
    const updateUserLocation = props.updateLocated;
    // state updater that determines whether to notify the user that their location is unknown.
    const alertUserNotFound = props.setShowAlert;
    // the text to be displayed on this button
    const locationButtonText = props.text;
    // the state that will hold the current location of the user.
    const [userPosition, setUserPosition] = useState(userLocation);
    // tells the map whether the user is currently being located
    const [locating, updateLocating] = useState(false);
    // spinner to indicate to the user that the map is looking for their location
    const locatingSymbol = (
        <Spinner animation="border" variant="primary" role="status" size="sm" aria-label={'locationLoadingSymbol'}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
    // decide which icon to display on the button
    const locationIcon = locating ? locatingSymbol : <BsFillCursorFill aria-label={'locationButtonSymbol'}/>
    // decide to display a UserLocationMarker on the Map
    const locationMarker = userPosition ? <UserLocationMarker position={userPosition}/> : <></>;

    /**
     * attempt to locate the current user using Leaflets locate function which will be
     * caught by Leaflets locationfound function below inside useMapEvents.
     */
    const locateCurrentUser = () => {
        updateLocating(true); // show loading symbol (looking for user location)
        alertUserNotFound(false); // hide unknown location alert
        map.locate(); // Leaflet function attempts to get the location the user
    }

    /**
     * provides the currently displayed map for the button so that when clicked,
     * the map can zoom to the current users found location.
     */
    const map = useMapEvents({
        locationfound(e) {
            const foundLocation = e.latlng; // where the user is determined to be
            setUserPosition(foundLocation);
            map.flyTo(foundLocation, map.getZoom()); // move map view to center on the user
            updateLocating(false); // no longer looking for location
            updateUserLocation(foundLocation);
        },
    });

    return (
        <div key={userLocation?.lng} aria-label={'userLocationButton'}>
            <Button type="button" className="btn btn-light" onClick={locateCurrentUser}>
                {locationIcon} {" "} {locationButtonText} {locationMarker}
            </Button>
        </div>
    )
}

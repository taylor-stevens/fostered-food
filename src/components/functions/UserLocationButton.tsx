import React, { Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button'
import '../../index.css'
import { BsFillCursorFill } from 'react-icons/bs';
import { Spinner } from 'react-bootstrap';
import {useUserLocatingContext} from "../../contexts/UserLocatingContext";

/**
 * A Button that allows a user to find their current location.
 * @returns {JSX.Element} - A Location Button.
 */
export default function UserLocationButton(
    props: {
        setShowAlert: Dispatch<SetStateAction<boolean>>; // whether to notify the user that their location is unknown

    }
) {
    // acknowledge the incoming parameters
    const [locating, setLocating] = useUserLocatingContext()
    const alertUserNotFound = props.setShowAlert;
    const locationButtonText = 'My Location'; // the text to be displayed on this button

    // spinner to indicate to the user that the map is looking for their location
    const locatingSymbol = (
        <Spinner animation="border" variant="light" role="status" size="sm" aria-label={ 'locationLoadingSymbol' }>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
    // decide which icon to display on the button
    const locationIcon = locating.isLocating ? locatingSymbol : <BsFillCursorFill aria-label={ 'locationButtonSymbol' }/>

    /**
     * attempt to locate the current user using Leaflets locate function which will be
     * caught by Leaflets locationfound function below inside useMapEvents.
     */
    const locateCurrentUser = () => {
        setLocating(true); // show loading symbol (looking for user location)
        alertUserNotFound(false); // hide unknown location alert
    }

    return (
        <div key={ 'userLocationButton' } aria-label={ 'userLocationButton' }>
            <Button style={{ fontSize: '15px' }} type="button" className="btn btn-outline"
                    onClick={ locateCurrentUser }>
                { locationIcon } { ' ' } { locationButtonText }
            </Button>
        </div>
    )
}

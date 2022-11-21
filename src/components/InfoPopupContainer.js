import React, {useContext} from "react";
import "../App.scss"
import {
    BLACK_LOCATION_MARKER_URL as locationMarker,
    RED_LOCATION_MARKER_URL as clickedMarker,
} from "../constants/constants";
import SingleFridgeOverallDisplay from "./SingleFridgeOverallDisplay";
import AllFridgesButtonList from "./AllFridgesButtonList";
import SelectedFridgeContext from "../contexts/SelectedFridgeContext";

/**
 * This component decides whether to render a selected fridge's information, or render a list of buttons each relating
 * to a given fridge depending on whether a fridge is selected.
 * @param props will at least include a value for selectedFridge, which will be an object or null depending on
 *              whether the user has selected a location; a value for updateSelected, which will be a function
 *              that allows the value of the selectedFridge state to be changed; a value for toggleAlert, which will
 *              be a function that allows the value of the alert state to be changed based on whether a user has
 *              been located yet or not; and a value for located, which will be a value representing the given
 *              user's location coordinates, if found.
 * @return {JSX.Element} - An informative panel with either one fridge's information or a list of buttons that will
 *                         guide a user to a singular fridge's information when clicked.
 */
export default function InfoPopupContainer(props) {

    const singleSelectedFridge = useContext(SelectedFridgeContext); // the currently selected fridge.
    const updateSelectedFridge = props.updateSelected; // the function that allows the currently
                                                       // selected fridge to a new location.
    const toggleAlert = props.toggleAlert; // the function that will toggle a notification to the
                                           // user that they have not been located.
    const userLocation = props.located; // the current location of this user (LtLng | undefined).

    return (
        <div>
            <img
                src={singleSelectedFridge ? clickedMarker : locationMarker}
                className='imgInformationPopup'
                alt={"Location Symbol"}
                aria-label={"imgInformationPopup"}
            />
            <div className="fridgeInfo">
                {
                    singleSelectedFridge ?
                    <SingleFridgeOverallDisplay
                        updateSelected={updateSelectedFridge}
                        // fridge={singleSelectedFridge}
                    /> :
                    <AllFridgesButtonList
                        toggleAlert={toggleAlert}
                        located={userLocation}
                        updateSelected={updateSelectedFridge}
                    />
                }
            </div>
        </div>
    )
}

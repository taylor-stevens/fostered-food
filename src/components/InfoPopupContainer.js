import React from "react";
import "../App.scss"
import redLoc from '../images/mapLocationIcon.png'
import blackLoc from '../images/mapLocationIconBlack.png'
import SingleFridgeInfoDisplay from "./SingleFridgeInfoDisplay";
import AllFridgesButtonList from "./AllFridgesButtonList";

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

    const selectedFridge = props.selectedFridge;
    const updateSelectedFridge = props.updateSelected;
    const toggleAlert = props.toggleAlert;
    const userLocation = props.located;

    return (
        // 'img' is a location marker graphic that is black if no fridge is currently selected,
        // and red if a currently selected fridge exists.
        <div>
            <img src={selectedFridge ? redLoc : blackLoc} style={{ height: 60, width: 40, marginLeft: 145, marginBottom: -50 }}
                 alt={"location symbol"} />
            <div className="fridgeInfo">
                {selectedFridge ? <SingleFridgeInfoDisplay updateSelected={updateSelectedFridge} fridge={selectedFridge}/> :
                    <AllFridgesButtonList
                        toggleAlert={toggleAlert}
                        located={userLocation}
                        updateSelected={updateSelectedFridge}
                    />}
            </div>
        </div>
    )
}

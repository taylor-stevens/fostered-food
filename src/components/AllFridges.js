import PopupControls from "./PopupControls";
import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {distance, getOrder} from "../utils/utils"
import * as L from "leaflet";
import {click} from "@testing-library/user-event/dist/click";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * @param data - The JSON data relating to the currently available fridge data.
 * @param updateSelected - {hook} the function that modifies which fridge is currently selected.
 * @return {JSX.Element} - A list of interactive buttons.
 */
export default function AllFridges(props) {

    let [fridgesDisplay, updateFridgesDisplay] = useState(props.data);
    //console.log(fridgesDisplay)
    //let [sorted, changeSortedValue] = useState(false)

    let sortByDistance = () => {
        if (props.located == null) {
            props.toggleAlert(true)
        }
        else {
            props.data.map(fridge => {
                //console.log(fridge.name + " original distance: " + fridge.distance)
                let dis = props.located.distanceTo(fridge.location)
                fridge.distance = (dis * 0.000621371192).toFixed(2)
                //console.log(fridge.name + ": " + fridge.distance)
            })
            let newOrder = props.data.sort(getOrder('distance'));
            updateFridgesDisplay(newOrder);
            // console.log('sorted fridges');
        }
    }

    let sortByVisted = () => {
        // TODO: function should take the list of fridges and sort them by their visit dates.
    }

    return (
        <div>
            <h1> No Fridge Selected </h1>
            <div style={{paddingTop: "0.5vh", paddingBottom: "0.5vh"}}>
                {"Filter By: " + " "}
                <ButtonGroup size={"sm"} className="me-2" aria-label="Distance">
                    <Button variant={"secondary"} onClick={sortByDistance}>Distance</Button>
                </ButtonGroup>
                <ButtonGroup size={"sm"} className="me-2" aria-label="Last Visited">
                    <Button variant={"secondary"}>Last Visited</Button>
                </ButtonGroup>
            </div>
            <div key={"fridgeList"}>
                {fridgesDisplay.map(fridge => (
                    <PopupControls
                        keyValue={fridge.name}
                        text={fridge.name + ": " + fridge.address}
                        updateSelected={props.updateSelected}
                        fridge={fridge}
                    />
                ))}
            </div>
        </div>

    )
}
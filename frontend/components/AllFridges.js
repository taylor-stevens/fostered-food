import PopupControls from "./PopupControls";
import React, {useContext, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getOrder} from "../utils/utils"
import DataContext from "../DataContext";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * @param data - The JSON data relating to the currently available fridge data.
 * @param updateSelected - {hook} the function that modifies which fridge is currently selected.
 * @return {JSX.Element} - A list of interactive buttons.
 */
export default function AllFridges(props) {

    const data = useContext(DataContext);
    const userLocation = props.located;
    let [fridgesDisplay, updateFridgesDisplay] = useState(data);

    let sortByDistance = () => {
        if (props.located == null) {
            props.toggleAlert(true)
        }
        else {
            data.forEach(fridge => fridge.distance = (userLocation.distanceTo(fridge.location) * 0.000621371192).toFixed(2))
            let newOrder = data.sort(getOrder('distance'));
            updateFridgesDisplay(newOrder);
        }
    }

    return (
        <div>
            <h1> No Fridge Selected </h1>
            <div style={{paddingTop: "0.5vh", paddingBottom: "0.5vh"}}>
                {"Filter By: "}
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
                        key={fridge.address}
                        keyValue={fridge.address}
                        text={fridge.name + ": " + fridge.address}
                        updateSelected={props.updateSelected}
                        fridge={fridge}
                    />
                ))}
            </div>
        </div>

    )
}
import SingleFridgeListButton from "./SingleFridgeListButton";
import React, {useContext, useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DataContext from "../contexts/DataContext";
import {setDistanceFromUser, sortByDistanceToFridge} from "../utils/utils";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * Relies on DataContext to render the list of fridges.
 * @param props will at least include a value for located, the location of the user, if
 *              found prior to this component being rendered; and toggleAlert, the function
 *              to be called if the distance sort is called without the user being located.
 * @return {JSX.Element} - A list of interactive buttons representing the community fridges.
 */
export default function AllFridgesButtonList(props) {

    const data = useContext(DataContext);
    const userLocation = props.located;
    const toggleAlert = props.toggleAlert;
    let [fridgesDisplay, updateFridgesDisplay] = useState(data);
    let [sortByDistanceToUser, setSortByDistanceToUser] = useState(false);

    useEffect(() => {
        if (sortByDistanceToUser) {
            updateFridgesDisplay(sortByDistanceToFridge(fridgesDisplay));
            setSortByDistanceToUser(false);
        }
    }, [fridgesDisplay, sortByDistanceToUser])

    let sortByDistance = () => {
        if (userLocation == null) {
            toggleAlert(true);
        }
        else {
            setDistanceFromUser(fridgesDisplay, userLocation);
            setSortByDistanceToUser(true);
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
                    <SingleFridgeListButton
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
import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {ButtonGroup, Form, ToggleButton} from "react-bootstrap";
import SingleFridgeContactInfo from "./SingleFridgeContactInfo";
import {BsXLg} from "react-icons/bs";
import {
    DEFAULT_BUTTON_COLOR as buttonColor,
    DEFAULT_TEXT_SIZE as textSize,
    DEFAULT_SELECTED_PAGE_COLOR as selected,
    DEFAULT_UNSELECTED_PAGE_COLOR as unselected,
} from "../constants/constants";
import {SingleFridgeInfoDisplay} from "./SingleFridgeInfoDisplay";
import SelectedFridgeContext from "../contexts/SelectedFridgeContext";

/**
 * This component renders an information panel that contains information about the currently
 * selected fridge. This component should not be rendered if the state of the
 * currently selected fridge is null.
 * @param props will include at least a value for fridge, the current fridge that is being displayed.
 * @return {JSX.Element} A descriptive and interactive panel for the currently selected fridge.
 */
export default function SingleFridgeOverallDisplay(props) {

    const thisSelectedFridge = useContext(SelectedFridgeContext); // the fridge that is being displayed
    const updateCurrentlySelectedFridge = props.updateSelected; // state updater to change the currently
                                                                // selected fridge.
    const thisSelectedFridgeName = thisSelectedFridge.name; // the name of the current fridge.
    const thisSelectedFridgeAddress = thisSelectedFridge.address; // the address of the current fridge.
    const [contact, seeContact] = useState(false) // the state that determines whether to display
                                                            // the contact info for this fridge
    const [radioValue, setRadioValue] = useState(2); // the state that determines the current display

    return (
        <div>
            <Button variant={buttonColor} onClick={() => updateCurrentlySelectedFridge(null)}>
                <BsXLg/>
            </Button>
            <h1>{thisSelectedFridgeName}</h1>
            <h2>{thisSelectedFridgeAddress}</h2>
            <h2>
                <ButtonGroup size={"sm"} className="me-2" aria-label="pageSelectionGroup" type={'radio'}>
                    <ToggleButton
                        value={2}
                        checked={radioValue === 2}
                        variant={radioValue % 3 ? selected : unselected}
                        style={{fontSize: textSize}}
                        onClick={() => {
                            seeContact(false);
                            setRadioValue(2);
                        }}>
                        Fridge Information
                    </ToggleButton>
                    <ToggleButton
                        value={3}
                        checked={radioValue === 3}
                        variant={radioValue % 2 ? selected : unselected}
                        style={{fontSize: textSize}}
                        onClick={() => {
                            seeContact(true);
                            setRadioValue(3)
                        }}>
                        Contact Information
                    </ToggleButton>
                </ButtonGroup>
            </h2>
            {contact ? <SingleFridgeContactInfo/> : <SingleFridgeInfoDisplay fridge={thisSelectedFridge}/>}
        </div>
    )
}
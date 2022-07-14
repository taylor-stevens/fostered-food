import PopupControls from "./PopupControls";
import React from "react";
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";

/**
 * This component renders an information panel that contains information about the currently selected fridge. This
 * component should not be rendered if the state of the currently selected fridge is null.
 * @param fridge {JSON} - the currently selected fridge.
 * @return {JSX.Element} - A descriptive and interactive panel.
 */
export default function FridgeInformation(props) {
    return (
        <div>
            <h2>{props.fridge.address}</h2>
            <ButtonGroup>
                <Button>Contact Fridge</Button>
                <Button>Post Information</Button>
            </ButtonGroup>
            <p style={{marginTop: '20px'}}>Updates</p>
            <p style={{fontSize: '12px'}}>Last Visit: 11/29/21 10:15</p>
        </div>
    )
}

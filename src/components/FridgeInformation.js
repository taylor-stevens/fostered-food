import PopupControls from "./PopupControls";
import React, {useMemo, useState} from "react";
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";

/**
 * This component renders an information panel that contains information about the currently selected fridge. This
 * component should not be rendered if the state of the currently selected fridge is null.
 * @param fridge {JSON} - the currently selected fridge.
 * @return {JSX.Element} - A descriptive and interactive panel.
 */
export default function FridgeInformation(props) {

    const contactClicked = () => {
        props.seeContact(true);
    }

    const opened = props.fridge.lastOpen.replace("T", " ").substring(
        0, props.fridge.lastOpen.indexOf(":") + 3
    )

    return (
        <div>
            <h2>{props.fridge.address}</h2>
            <ButtonGroup>
                <Button onClick={contactClicked}>Contact Fridge</Button>
                <Button>Post Information</Button>
            </ButtonGroup>
            <p style={{fontSize: '12px'}}>Last Visit: {
                opened || "unknown"
            }</p>
        </div>
    )
}

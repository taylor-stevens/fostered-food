import PopupControls from "./PopupControls";
import React, {useEffect, useMemo, useState} from "react";
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";
import ContactInfo from "./ContactInfo";
import {BsXLg} from "react-icons/bs";

/**
 * This component renders an information panel that contains information about the currently selected fridge. This
 * component should not be rendered if the state of the currently selected fridge is null.
 * @param fridge {JSON} - the currently selected fridge.
 * @return {JSX.Element} - A descriptive and interactive panel.
 */
export default function FridgeInformation(props) {

    const [contact, seeContact] = useState(false)

    // replace the lastOpen string with more human-readable string
    const opened = props.fridge.lastOpen.replace("T", " ").substring(
        0, props.fridge.lastOpen.indexOf(":") + 3
    )

    return (
        <div>
            <Button variant={"light"} onClick={() => props.updateSelected(null)}><BsXLg/></Button>
            <h1>{props.fridge.name}</h1>
            <h2>{props.fridge.address}</h2>
            <ButtonGroup>
                <Button onClick={() => seeContact(false)}>Post Information</Button>
                <Button onClick={() => seeContact(true)}>Contact Fridge</Button>
            </ButtonGroup>
            {contact ? <ContactInfo fridge={props.fridge}/> : <div>Last Visit: {opened || "unknown"}</div>}
        </div>
    )
}

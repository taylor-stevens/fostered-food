import {useMemo, useState} from "react";
import {useMapEvents} from "react-leaflet";
import '../App.scss'
import Button from "react-bootstrap/Button";

export default function PopupControls(props) {

    let clicked = () => {
        props.updateSelected(props.fridge)
    }

    const exit = useMapEvents({
        click() {
            props.updateSelected(null)
        }
    })

    return (
        <div key={props.keyValue} className="popUpControls">
            <Button variant="outline-secondary" key={props.keyValue} onClick={clicked}>
                {props.text}
            </Button>
        </div>
    )
}
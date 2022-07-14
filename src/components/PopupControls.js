import {useMemo, useState} from "react";
import {useMapEvents} from "react-leaflet";
import '../App.scss'
import Button from "react-bootstrap/Button";

export default function PopupControls(props) {

    const clicked = useMemo(
        () => ({
            click() {
                props.updateSelected(props.fridge)
            }
        }),
        []
    )

    const exit = useMapEvents({
        click() {
            props.updateSelected(null)
        }
    })

    return (
        <div key={props.keyValue}>
            <Button variant="outline-secondary" key={props.keyValue} onClick={clicked} style={props.style}>
                {props.text}
            </Button>
        </div>
    )
}
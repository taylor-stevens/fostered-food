import {useRef} from "react";
import {useMapEvents} from "react-leaflet";
import '../App.scss'
import Button from "react-bootstrap/Button";
import {map} from "leaflet";

export default function PopupControls(props) {

    const map = useMapEvents({
        click(e) {
            //console.log(map)
        },
    })

    let updateView = () => {
        props.updateSelected(props.fridge);
        map.flyTo(props.fridge.location, 14, {
            duration: 1.5
        });
    }

    const exit = useMapEvents({
        click() {
            props.updateSelected(null);
        }
    })

    return (
        <div key={props.keyValue} className="popUpControls">
            <Button variant="outline-secondary" key={props.keyValue} onClick={updateView}>
                {props.text}
            </Button>
        </div>
    )
}
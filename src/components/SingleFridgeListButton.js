import {useMapEvents} from "react-leaflet";
import '../App.scss'
import Button from "react-bootstrap/Button";

export default function SingleFridgeListButton(props) {

    const map = useMapEvents({
        click(e) {
            //console.log(map)
        },
    })

    let updateView = () => {
        props.updateSelected(props.fridge);
        map.flyTo(
            props.fridge.location,
            14,
            {duration: 1.5}
        );
    }

    return (
        <div key={props.keyValue} className="popUpControls">
            <Button variant="outline-secondary" size="sm" key={props.keyValue} onClick={updateView}>
                {props.text}
            </Button>
        </div>
    )
}
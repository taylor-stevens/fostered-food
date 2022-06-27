import {useMemo, useState} from "react";
import {useMapEvents} from "react-leaflet";
import '../App.scss'

function PopupControls(props) {

    const [button, buttonClicked] = useState(false)

    const clicked = useMemo(
        () => ({
            click() {
                props.click_on()
            }
        })
        [buttonClicked]
    )

    const exit = useMapEvents({
        click() {
            props.click_off()
        }
    })

    return (
        <div>
            <button className={"button"} onClick={clicked} style={props.style}>
                {props.text}
            </button>
        </div>
    )
}

export default PopupControls
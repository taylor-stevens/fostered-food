import {useMemo, useState} from "react";
import {useMapEvents} from "react-leaflet";
import '../App.scss'

function PopupControls({text, style, click_on, click_off}) {

    const [button, buttonClicked] = useState(false)

    const clicked = useMemo(
        () => ({
            click() {
                click_on()
            }
        })
        [buttonClicked]
    )

    const exit = useMapEvents({
        click() {
            click_off()
        }
    })

    return (
        <div>
            <button className={"button"} onClick={clicked} style={style}>
                {text}
            </button>
        </div>
    )
}

export default PopupControls
import {useMapEvents} from "react-leaflet";


export default function ContactInfo(props) {

    return (
        <div>
            <div>
                {props.fridge.name}
            </div>
            <div>
                {props.fridge.address}
            </div>
            <div>
                {props.fridge.contact.map(
                    fridge => <div>
                        {fridge}
                    </div>
                )}
            </div>
        </div>
    )
}
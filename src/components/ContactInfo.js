import {useMapEvents} from "react-leaflet";


export default function ContactInfo(props) {

    return (
        <div>
            <div>
                {props.fridge.contact.map(
                    fridge => <div>
                        <div style={{fontWeight: "bold"}}>
                            {fridge[0]}
                        </div>
                        <div>
                            {fridge[1]}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
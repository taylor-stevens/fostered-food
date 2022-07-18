import {useMapEvents} from "react-leaflet";


export default function ContactInfo(props) {

    useMapEvents({
        click() {
            props.seeContact(false);
        }
    })

    return (
        <div className="contactInfo">
            <div className="leaflet-control">
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
        </div>
    )
}
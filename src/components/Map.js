import {
  MapContainer,
  TileLayer, useMapEvents,
} from 'react-leaflet'
import "../index.css"
import { BsFillCursorFill } from "react-icons/bs"
import LocationMarker from './LocationMarker'
import MyLocation from './MyLocation'
import MapControls from "./MapControls";
import {useMemo, useState} from "react";
import InformationPopup from "./InformationPopup";
import ContactInfo from "./ContactInfo";

/**
 * Produces an interactive Leaflet Map with constrols and information about community fridges.
 * @param data - All of the recorded fridges and their information.
 * @returns {JSX.Element} - A Leaflet Map, centered around Longwood, Boston.
 */
export default function Map(props) {

    //console.log(data)

    // this is the center of the map for Boston
    const BostonPosition = [42.341689323556885, -71.10989837318938]
    // state to keep track of which fridge is selected
    const [selectedFridge, updateSelected] = useState(null)
    const [contact, seeContact] = useState(false)

    return (
        <MapContainer center={BostonPosition} zoom={14} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158"
            />
            {
                props.data === null ? <></> :
                    <div>
                        {props.data.map(fridge => <LocationMarker key={fridge.name} fridge={fridge} selectedFridge={selectedFridge} updateSelected={updateSelected} />)}
                        <MapControls icon={<BsFillCursorFill />} text={"My Location"} position="leaflet-top leaflet-right"/>
                        <InformationPopup data={props.data} selectedFridge={selectedFridge} updateSelected={updateSelected} seeContact={seeContact}/>
                        {contact ? <ContactInfo fridge={selectedFridge}/> : <></>}
                    </div>
            }
        </MapContainer>
    )
}
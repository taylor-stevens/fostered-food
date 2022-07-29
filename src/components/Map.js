import {
  MapContainer,
  TileLayer, useMapEvents,
} from 'react-leaflet'
import "../index.css"
import { BsFillCursorFill } from "react-icons/bs"
import LocationMarker from './LocationMarker'
import MapControls from "./MapControls";
import {useState} from "react";
import InformationPopup from "./InformationPopup";
import {Spinner} from "react-bootstrap";

/**
 * Produces an interactive Leaflet Map with constrols and information about community fridges.
 * @param data - All of the recorded fridges and their information.
 * @returns {JSX.Element} - A Leaflet Map, centered around Longwood, Boston.
 */
export default function Map(props) {

    // this is the center of the map for Boston
    const BostonPosition = [42.341689323556885, -71.10989837318938]
    // state to keep track of which fridge is selected
    const [selectedFridge, updateSelected] = useState(null)

    const [locating, updateLocating] = useState(false)
    const [located, updateLocated] = useState(null)
    const locatingSymbol =  <Spinner animation="border" variant="primary" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>

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
                        <MapControls
                            icon={locating ? locatingSymbol : <BsFillCursorFill />}
                            text={"My Location"}
                            position="leaflet-top leaflet-right"
                            updateLocating={updateLocating}
                            updateLocated={updateLocated}
                        />
                        <InformationPopup located={located} data={props.data} selectedFridge={selectedFridge} updateSelected={updateSelected}/>
                    </div>
            }
        </MapContainer>
    )
}
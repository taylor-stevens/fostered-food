import {
  MapContainer,
  TileLayer,
} from 'react-leaflet'
import "../index.css"
import fridges from "../data/fridges.json"
import { BsFillCursorFill } from "react-icons/bs"
import LocationMarker from './LocationMarker'
import MyLocation from './MyLocation'
import MapControls from "./MapControls";
import { useState } from "react";

/**
 * Produces an interactive Leaflet Map
 * @returns {JSX.Element} The Map, centered around Longwood area Boston.
 */
export default function Map() {

  // this is the center of the map for Boston
  const BostonPosition = [42.341689323556885, -71.10989837318938]
  // state to keep track of which fridge is selected
  const [selectedFridge, updateSelected] = useState(null);

  return (
    <MapContainer center={BostonPosition} zoom={14} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158"
    />
      {fridges.map(fridge => <LocationMarker fridge={adaptJsonInformation(JSON.parse(fridge))} selectedFridge={selectedFridge} updateSelected={updateSelected} />)}
      <MapControls icon={<BsFillCursorFill />} text={"My Location"} position="leaflet-top leaflet-right"/>
    </MapContainer>
  )
}
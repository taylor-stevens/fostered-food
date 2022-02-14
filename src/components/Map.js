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

/*
 * This is a function that produces the interactive map.
 *
 * returns: html of the desired map
 */
export default function Map() {

  // this is the center of the map
  const position = [42.341689323556885, -71.10989837318938]

  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158"
    />
      {fridges.map(LocationMarker)}
      <MapControls icon={<BsFillCursorFill />} text={"My Location"} position="leaflet-top leaflet-right"/>
    </MapContainer>
  )
}
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

/**
 * Produces an interactive Leaflet Map with constrols and information about community fridges.
 * @param data {JSON} - All of the recorded fridges and their information.
 * @returns {JSX.Element} - A Leaflet Map, centered around Longwood, Boston.
 */
export default function Map({data}) {

    console.log(data)

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
          {
              data === null ? <></> :
                  <div>
                      {data.map(fridge => <LocationMarker fridge={fridge} selectedFridge={selectedFridge} updateSelected={updateSelected} />)}
                      <MapControls icon={<BsFillCursorFill />} text={"My Location"} position="leaflet-top leaflet-right"/>
                      <InformationPopup data={data} selectedFridge={selectedFridge} updateSelected={updateSelected} position="leaflet-bottom leafet-left"/>
                  </div>
          }
      </MapContainer>
  )
}
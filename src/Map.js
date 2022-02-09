import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import * as leaflet from 'leaflet'
import "./index.css"
import fridges from "./fridges.json"
import locationPointer from "./mapLocationIcon.png"
import clickedLocation from "./mapLocationIconBlack.png"
import infoArrrow from "./bubbleArrow.png"

/*
 * This is a function that produces the interactive map.
 *
 * returns: html of the desired map
 */
export default function Map() {

  // this is the center of the map
  const position = [42.341689323556885, -71.10989837318938]

  const marker = leaflet.icon({
    iconUrl: locationPointer,
    iconSize: [30,45],
  })

  const clickedMarker = leaflet.icon({
    iconUrl: clickedLocation,
    iconSize: [45, 67.5]
  })

  function createMarker(fridge) {
    return (
        <Marker position={fridge.coordinates}
                icon={marker}>
          <Popup>
            This is the {fridge.name} <br /> Located at {fridge.address}
          </Popup>
        </Marker>
    )
  }

  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158"
    />
      {fridges.map(createMarker)}
  </MapContainer>

  )
}
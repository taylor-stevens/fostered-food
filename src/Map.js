import {MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle} from 'react-leaflet'
import * as leaflet from 'leaflet'
import "./index.css"
import fridges from "./fridges.json"
import locationPointer from "./mapLocationIcon.png"
import clickedLocation from "./mapLocationIconBlack.png"
import myLocation from "./myLocation.png"
import infoArrrow from "./bubbleArrow.png"
import {click} from "@testing-library/user-event/dist/click";
import {useMemo, useState} from "react";

/*
 * This is a function that produces the interactive map.
 *
 * returns: html of the desired map
 */
export default function Map() {

  // this is the center of the map
  const position = [42.341689323556885, -71.10989837318938]


  const clickedMarker = leaflet.icon({
    iconUrl: clickedLocation,
    iconSize: [45, 67.5]
  })

  const marker = leaflet.icon({
    iconUrl: locationPointer,
    iconSize: [30,45],
  })

  const myLoc = leaflet.icon({
    iconUrl: myLocation,
    iconSize: [45, 67.5],
  })

  function CreateMarker(fridge) {

    let [state, stateChanged] = useState(true)

    const markerClicked = useMemo(
        () => ({
          click() {
            stateChanged(false)
          },
        }),
        [],
    )

    return (
        <Marker position={fridge.coordinates}
                icon={state ? marker : clickedMarker}
                eventHandlers={markerClicked}>
          <Popup>
            This is the {fridge.name} <br /> Located at {fridge.address}
          </Popup>
        </Marker>
    )
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
        <Marker position={position} icon={myLoc}>
          <Popup>You Are Here</Popup>
        </Marker>
    )
  }

  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158"
    />
      {fridges.map(CreateMarker)}
      <LocationMarker />
    </MapContainer>
  )
}
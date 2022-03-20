import {useEffect, useMemo, useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import infoArrrow from "../images/bubbleArrow.png";
import * as leaflet from "leaflet";
import clickedLocation from "../images/mapLocationIconBlack.png";
import locationPointer from "../images/mapLocationIcon.png";
import LocationPopup from "./LocationPopup";

/**
 * A marking on the Map representing the location of a community fridge.
 * @param {JSON} fridge - A single community fridge from the fridges JSON file.
 * @returns {JSX.Element} A Marker with a popup that describes the given fridge
 */
export default function LocationMarker({fridge, selectedFridge, updateSelected}) {
    
  //useState to change the <Marker />'s icon when clicked
    const [isSelected, locationClicked] = useState(false)

    const markerClicked = useMemo(
        () => ({
            click() {
                updateSelected(fridge)
            },
        }),
        [isSelected]
    )

    // useEffect is called after this component is re-rendered
    // Checks whether this marker has been selected according to the map and changes state accordingly
    useEffect(() => {
        if(selectedFridge !== null && fridge.name === selectedFridge.name) {
            locationClicked(true)
        } else {
            locationClicked(false)
        } 
    })

    //icons for clicked and un-clicked states
    const marker = leaflet.icon({
        iconUrl: locationPointer,
        iconSize: [30,45],
    })
    const clickedMarker = leaflet.icon({
        iconUrl: clickedLocation,
        iconSize: [45, 67.5]
    })

    return (
        <Marker position={fridge.coordinates}
                icon={isSelected ? clickedMarker : marker}
                eventHandlers={markerClicked}
                key={fridge.location}>
                <LocationPopup data={fridge}/>
        </Marker>
    )
}
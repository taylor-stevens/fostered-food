import React, {useMemo, useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import infoArrrow from "../images/bubbleArrow.png";
import * as leaflet from "leaflet";
import clickedLocation from "../images/mapLocationIconBlack.png";
import locationPointer from "../images/mapLocationIcon.png";
import LocationPopup from "./LocationPopup";

/*
 * A marking on the <Map /> representing the location of a community fridge.
 * fridge - a single community fridge from the fridges JSON file
 * return - a marker with a popup that describes the given fridge
 */
function LocationMarker(fridge) {

    //useState to change the <Marker />'s icon when clicked
    const [location, locationClicked] = useState(false)

    const markerClicked = useMemo(
        () => ({
            click() {
                locationClicked(true)
            },
        }),
        [],
    )

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
                icon={location ? clickedMarker : marker}
                eventHandlers={markerClicked}
                key={fridge.coordinates}>
                <LocationPopup data = {fridge}/>
        </Marker>
    )
}

export default LocationMarker
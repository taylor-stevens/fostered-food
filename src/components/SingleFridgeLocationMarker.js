import {useEffect, useMemo, useState} from "react";
import {Marker} from "react-leaflet";
import * as leaflet from "leaflet";
import clickedLocation from "../images/mapLocationIconBlack.png";
import locationPointer from "../images/mapLocationIcon.png";
import SingleFridgeLocationPopup from "./SingleFridgeLocationPopup";

/**
 * A marking on the Map representing the location of a community fridge.
 * @param fridge {JSON} - A single community fridge from the fridges JSON file.
 * @param selectedFridge {JSON} - The current fridge on the map that is selected, if there is one.
 * @param updateSelected {hook} - the function that updates the current selected fridge on the map to a new one.
 * @returns {JSX.Element} - A Marker with a popup that describes the given fridge
 */
export default function SingleFridgeLocationMarker(props) {

    const updateSelectedFridge = props.updateSelected;
    const selectedFridge = props.selectedFridge;
    const thisFridge = props.fridge;

    // useState to change the <Marker />'s icon when clicked
    const [isSelected, locationClicked] = useState(false)

    const markerClicked = useMemo(
        () => ({
            click() {
                updateSelectedFridge(thisFridge)
            },
        }),
        [thisFridge, updateSelectedFridge]
    )

    // useEffect is called after this component is re-rendered
    // Checks whether this marker has been selected according to the map and changes state accordingly
    useEffect(() => {
        if (selectedFridge !== null && thisFridge.location === selectedFridge.location) {
            locationClicked(true)
        } else {
            locationClicked(false)
        } 
    }, [selectedFridge, thisFridge])

    // icons for clicked and un-clicked states
    const marker = leaflet.icon({
        iconUrl: clickedLocation,
        iconSize: [30,45],
    })
    const clickedMarker = leaflet.icon({
        iconUrl: locationPointer,
        iconSize: [45, 67.5]
    })

    return (
            <Marker
                position={thisFridge.location}
                icon={isSelected ? clickedMarker : marker}
                eventHandlers={markerClicked}
                key={thisFridge.location}
            >
                <SingleFridgeLocationPopup
                    name={thisFridge.name}
                    location={thisFridge.address}
                />
            </Marker>
    )
}
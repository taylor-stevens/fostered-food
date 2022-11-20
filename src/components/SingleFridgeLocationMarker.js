import {useEffect, useMemo, useState} from "react";
import {Marker} from "react-leaflet";
import {
    CLICKED_LOCATION_MARKER as clickedMarker,
    DEFAULT_LOCATION_MARKER as locationMarker,
} from "../constants/constants";
import SingleFridgeLocationPopup from "./SingleFridgeLocationPopup";

/**
 * A marking on the Map representing the location of a single community fridge.
 * @param props will include at least a value for updateSelected, a function that allows the state
 *              of the currently selected fridge to be changed; a value for selectedFridge, the
 *              state value of the fridge that the user has currently selected; and a value for
 *              fridge, which is the fridge that this Location Marker represents.
 * @returns {JSX.Element} - A Marker with a popup that describes this fridge.
 */
export default function SingleFridgeLocationMarker(props) {

    const updateSelectedFridge = props.updateSelected;
    const selectedFridge = props.selectedFridge;
    const thisFridge = props.fridge;

    // useState to change the <Marker/>'s icon when clicked
    const [isSelected, locationClicked] = useState(false)

    // when this marker is clicked, update the currently selected fridge to be this fridge.
    const markerClicked = useMemo(
        () => ({
            click() {
                updateSelectedFridge(thisFridge)
            },
        }),
        [thisFridge, updateSelectedFridge]
    )

    // Checks whether this marker has been selected according to the map and changes state accordingly
    useEffect(() => {
        if (selectedFridge !== null && thisFridge.location === selectedFridge.location) {
            locationClicked(true)
        } else {
            locationClicked(false)
        } 
    }, [selectedFridge, thisFridge])

    return (
            <Marker
                position={thisFridge.location}
                icon={isSelected ? clickedMarker : locationMarker}
                eventHandlers={markerClicked}
                key={thisFridge.location}
            >
                <SingleFridgeLocationPopup
                    fridge={thisFridge}
                />
            </Marker>
    )
}
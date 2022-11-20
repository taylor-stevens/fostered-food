import {
  MapContainer,
  TileLayer,
} from 'react-leaflet'
import "../index.css"
import {BsFillCursorFill} from "react-icons/bs"
import SingleFridgeLocationMarker from './SingleFridgeLocationMarker'
import UserLocationButton from "./UserLocationButton";
import React, {useContext, useState} from "react";
import InfoPopupContainer from "./InfoPopupContainer";
import {Spinner} from "react-bootstrap";
import DataContext from "../contexts/DataContext";
import UserNotification from "./UserNotification";
import LeafletComponentContainer from "./LeafletComponentContainer";
import {
    DEFAULT_MAP_ZOOM as defaultZoom,
    DEFAULT_MAP_CENTER as defaultCenter,
    DEFAULT_TILE_PROVIDER as tileProvider,
    DEFAULT_MAP_STYLE as mapStyle,
} from '../constants/constants'

/**
 * Produces an interactive Leaflet Map with controls and information about community fridges.
 * @returns {JSX.Element} - A Leaflet Map, centered around Boston, MA.
 */
export default function Map() {

    const data = useContext(DataContext); // the fridge data from the database
    // state to keep track of which fridge is selected.
    const [selectedFridge, updateSelected] = useState(null)
    // the state that tells the map whether the user is currently being
    // located/whether the user's location is loading.
    const [locating, updateLocating] = useState(false)
    // the state that tells the map the current location of the user, if found (LtLng | undef)
    const [located, updateLocated] = useState(null)
    // the state that tells the map whether to notify the user that their location is unknown.
    const [alert, toggleAlert] = useState(false)
    // the symbol that appears to show the user that their location is being looked for through
    // Leaflet Maps locator.
    const locatingSymbol =  <Spinner animation="border" variant="primary" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>

    return (
        <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true}>
            <TileLayer attribution={tileProvider} url={mapStyle}/>
            <LeafletComponentContainer
                location={"leaflet-top leaflet-right"}
                className={"leaflet-bar"}
                contents={
                    <UserLocationButton
                        icon={locating ? locatingSymbol : <BsFillCursorFill/>}
                        text={"My Location"}
                        updateLocating={updateLocating}
                        updateLocated={updateLocated}
                        toggleAlert={toggleAlert}
                    />
                }
            />
            {
                data === null ?
                    <LeafletComponentContainer
                        location={"leaflet-top leaflet-middle"}
                        contents={
                            <UserNotification
                                text={"Fridge Data is Currently Unavailable. Try Again Later."}
                                showClose={false}
                            />
                        }
                    /> :
                    <div>
                        {data.map(fridge =>
                            <SingleFridgeLocationMarker
                                key={fridge.address}
                                fridge={fridge}
                                selectedFridge={selectedFridge}
                                updateSelected={updateSelected}
                            />)}
                        <LeafletComponentContainer
                            location={"leaflet-bottom leaflet-left"}
                            contents={
                                <InfoPopupContainer
                                    toggleAlert={toggleAlert}
                                    located={located}
                                    selectedFridge={selectedFridge}
                                    updateSelected={updateSelected}
                                />
                            }
                        />
                        {alert ?
                            <LeafletComponentContainer
                                location={"leaflet-top leaflet-middle"}
                                contents={
                                    <UserNotification
                                        text={"Enable Location by clicking the 'My Location' button in the"+
                                            " upper right hand corner to sort fridges by distance to you."}
                                        showClose={true}
                                        closeButtonFunction={toggleAlert}
                                        closeFunctionValue={false}
                                    />
                                }
                            />: <></>}
                    </div>
            }
        </MapContainer>
    )
}
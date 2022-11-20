import {
  MapContainer,
  TileLayer,
} from 'react-leaflet'
import "../index.css"
import {BsFillCursorFill, BsXLg} from "react-icons/bs"
import SingleFridgeLocationMarker from './SingleFridgeLocationMarker'
import UserLocationButton from "./UserLocationButton";
import React, {useContext, useState} from "react";
import InfoPopupContainer from "./InfoPopupContainer";
import {Alert, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import useDataContext from "../useDataContext";
import DataContext from "../contexts/DataContext";
import UserNotification from "./UserNotification";
import LeafletComponentContainer from "./LeafletComponentContainer";

/**
 * Produces an interactive Leaflet Map with constrols and information about community fridges.
 * @param data - All of the recorded fridges and their information.
 * @returns {JSX.Element} - A Leaflet Map, centered around Longwood, Boston.
 */
export default function Map() {

    const data = useContext(DataContext);

    // this is the center of the map for Boston
    const BostonPosition = [42.341689323556885, -71.10989837318938]
    // state to keep track of which fridge is selected
    const [selectedFridge, updateSelected] = useState(null)

    const [locating, updateLocating] = useState(false)
    const [located, updateLocated] = useState(null)
    const locatingSymbol =  <Spinner animation="border" variant="primary" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>

    const [alert, toggleAlert] = useState(false)

    return (
        <MapContainer center={BostonPosition} zoom={14} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158"
            />
            {
                data === null ? <></> :
                    <div>
                        {data.map(fridge =>
                            <SingleFridgeLocationMarker
                                key={fridge.address}
                                fridge={fridge}
                                selectedFridge={selectedFridge}
                                updateSelected={updateSelected}
                            />)}

                        <LeafletComponentContainer
                            location={"leaflet-top leaflet-right"}
                            className={"leaflet-bar"}
                            contents={
                                <UserLocationButton
                                    icon={locating ? locatingSymbol : <BsFillCursorFill />}
                                    text={"My Location"}
                                    position="leaflet-top leaflet-right"
                                    updateLocating={updateLocating}
                                    updateLocated={updateLocated}
                                    toggleAlert={toggleAlert}
                                />
                            }
                        />

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
                                        clickButtonFunction={toggleAlert}
                                        functionValue={false}
                                    ></UserNotification>
                                }
                            />: <></>}
                    </div>
            }
        </MapContainer>
    )
}
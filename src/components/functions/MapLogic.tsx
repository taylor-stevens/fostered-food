import {TileLayer, useMapEvents} from "react-leaflet";
import {
    DEFAULT_DATA_FETCH_FAIL_MSG as dataFailMsg,
    DEFAULT_MAP_STYLE as mapStyle,
    DEFAULT_TILE_PROVIDER as tileProvider,
    DEFAULT_MAP_ZOOM as mapZoom,
    DEFAULT_ZOOM_SPEED as zoomSpeed
} from "../../constants/constants";
import LeafletComponentContainer from "./LeafletComponentContainer";
import UserLocationButton from "./UserLocationButton";
import React, {Dispatch, SetStateAction, useContext, useEffect} from "react";
import {LatLng} from "leaflet";
import {Fridge} from "../../types/Types";
import SingleFridgeLocationMarker from "./SingleFridgeLocationMarker";
import UserNotification from "./UserNotification";
import DataContext from "../../contexts/DataContext";

export default function MapLogic(
    props: {
        located: LatLng | undefined;
        updateLocated: Dispatch<SetStateAction<LatLng | undefined>>
        setShowAlert: Dispatch<SetStateAction<boolean>>
        updateSelected: Dispatch<SetStateAction<Fridge | undefined>>
        showAlert: boolean;
        setZoomingMap: Dispatch<SetStateAction<boolean>>
        zoomingMap: boolean;
        zoomingTo: [any, any] | undefined;
    }
) {
    const data = useContext(DataContext);
    const located = props.located;
    const updateLocated = props.updateLocated;
    const setShowAlert = props.setShowAlert;
    const updateSelected = props.updateSelected;
    const showAlert = props.showAlert;
    const setZoomingMap = props.setZoomingMap;
    const zoomingMap = props.zoomingMap;
    const zoomingTo = props.zoomingTo;

    /**
     * Function that returns the map that is being interacted with, such that the user
     * will be able to have their view updated depending on the map elements that
     * they are interacting with, such as the map re-centering on selected {@link Fridge}s.
     */
    const map = useMapEvents({});

    useEffect(() => {
        if (zoomingMap && zoomingTo) {
            map.flyTo(
                [zoomingTo[0] - (map.getContainer().scrollHeight / 400000), zoomingTo[1]],
                mapZoom, // the distance of the user to the map (how much detail the map will show them)
                { duration: zoomSpeed } // the amount of time that updating/panning the view should take
            );
            setZoomingMap(false);
        }
    });

    /**
     * decide to display an error message depending on if a user has clicked the
     * sort button before being located. Nothing is rendered for the alert on default
     * (application start).
     */
    let noLocationAlert = <></>;
    if (showAlert) {
        noLocationAlert = (
            <LeafletComponentContainer
                location={'leaflet-top leaflet-middle'}
                contents={
                    <UserNotification
                        text={
                            "Enable Location by clicking the 'My Location' button in the" +
                            ' upper right hand corner to sort fridges by distance to you.'
                        }
                        showClose={true}
                        closeButtonFunction={setShowAlert}
                        closeFunctionValue={false}/>
                }/>
        );
    };

    /**
     * Determine whether to notify the user of the lack of access to the Fridge data from the database,
     * or whether to render the Marker's on the Map alongside the information container.
     */
    let dataOrAlert = <></>;
    if (data) {
        dataOrAlert = (
            <>
                {data.map((fridge) => (
                    <SingleFridgeLocationMarker
                        key={fridge.address}
                        fridge={fridge}
                        updateSelected={updateSelected}/>
                ))}
                {noLocationAlert}
            </>
        );
    } else {
        dataOrAlert = (
            <LeafletComponentContainer
                location={'leaflet-top leaflet-middle'}
                contents={
                    <UserNotification
                        text={dataFailMsg}
                        showClose={false}/>
                }/>
        );
    }

    return (
        <div>
            <div style={{zIndex: 9}} aria-label={'tileLayer'}><TileLayer attribution={tileProvider} url={mapStyle}/></div>
            <LeafletComponentContainer
                location={'leaflet-top leaflet-right'}
                className={'leaflet-bar'}
                contents={
                    <UserLocationButton text={'My Location'}
                                        located={located}
                                        updateLocated={updateLocated}
                                        setShowAlert={setShowAlert}/>
                }/>
            {dataOrAlert}
        </div>
    )
}
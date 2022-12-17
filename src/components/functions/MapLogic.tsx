import { TileLayer, useMapEvents } from 'react-leaflet';
import {
    DEFAULT_MAP_STYLE as mapStyle,
    DEFAULT_TILE_PROVIDER as tileProvider,
    DEFAULT_MAP_ZOOM as mapZoom,
    DEFAULT_ZOOM_SPEED as zoomSpeed
} from '../../constants/constants';
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { LatLng } from 'leaflet';
import { Fridge } from '../../types/Types';
import SingleFridgeLocationMarker from './SingleFridgeLocationMarker';
import DataContext from '../../contexts/DataContext';
import UserLocationMarker from './UserLocationMarker';

/**
 * Renders the Leaflet Map Elements onto the MapContainer.
 */
export default function MapLogic(
    props: {
        located: LatLng | undefined; // the current location of the user, if found
        updateLocated: Dispatch<SetStateAction<LatLng | undefined>>; // function to change the location of the user
        locating: boolean; // if the user's location ois being processed by Leaflet
        updateLocating: Dispatch<SetStateAction<boolean>>; // function to change location finding state
        setSelectedFridge: Dispatch<SetStateAction<Fridge | undefined>>; // function updates the current selected fridge
        zoomingMap: boolean; // is the map currently changing its view
        setZoomingMap: Dispatch<SetStateAction<boolean>>; // change the state of zoomingMap
        zoomingTo: [any, any] | undefined; // the location the map is zooming/panning to
    }
) {
    // get the application data based on the context
    const data = useContext(DataContext);

    // acknowledge the incoming parameters
    const locating = props.locating;
    const updateLocating = props.updateLocating;
    const located = props.located;
    const updateLocated = props.updateLocated;
    const setSelectedFridge = props.setSelectedFridge;
    const setZoomingMap = props.setZoomingMap;
    const zoomingMap = props.zoomingMap;
    const zoomingTo = props.zoomingTo;

    /**
     * Function that returns the map that is being interacted with, such that the user
     * will be able to have their view updated depending on the map elements that
     * they are interacting with, such as the map re-centering on selected {@link Fridge}s.
     * Responds to clicking, which sets the selected fridge to undefined as well as
     * locationfound events from Leaflet such that the map will re-center on this location.
     */
    const map = useMapEvents({
        click(e) {
            setSelectedFridge(undefined);
        },
        locationfound(e) {
            const foundLocation = e.latlng; // where the user is determined to be
            updateLocated(foundLocation); // keep track of the found location
            map.flyTo( // move map view to center on the user
                [foundLocation.lat - (map.getContainer().scrollHeight / 400000), foundLocation.lng],
                map.getZoom(), // zoom in on this location
                { duration: zoomSpeed } // the amount of time that updating/panning the view should take
            );
            updateLocating(false); // no longer looking for location
        }
    });

    useEffect(() => {
        if (zoomingMap && zoomingTo) { // currently, the map should be zooming and there is a location to go to
            map.flyTo(
                [zoomingTo[0] - (map.getContainer().scrollHeight / 400000), zoomingTo[1]],
                mapZoom, // zoom in on this location
                { duration: zoomSpeed } // the amount of time that updating/panning the view should take
            );
            setZoomingMap(false); // no longer panning the map
        }
        if (locating) { // if the user's location is currently being requested
            map.locate(); // Leaflet function attempts to get the location the user
        }
    });

    // decide to display a UserLocationMarker on the Map (have they been found?)
    const locationMarker = located ? <UserLocationMarker position={ located }/> : <></>;

    return (
        <div>
            <div style={{zIndex: 9}} aria-label={'tileLayer'}><TileLayer attribution={tileProvider} url={mapStyle}/></div>
            {data?.map((fridge) => (
                    <SingleFridgeLocationMarker
                        key={fridge.address}
                        fridge={fridge}
                        setSelectedFridge={setSelectedFridge}/>
                ))}
            {locationMarker}
        </div>
    )
}
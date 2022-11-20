import {Coordinate} from "../../shared/types/Types";
import * as leaflet from 'leaflet';
let blackLocationIcon = require("../images/mapLocationIconBlack.png");
let redLocationIcon = require("../images/mapLocationIconRed.png");
let blueLocationIcon = require("../images/mapLocationIconBlue.png");
let Filter = require('bad-words')

/**
 * Location Marker Defaults
 */
// the default location marker graphic (A black location marker graphic)
export const DEFAULT_LOCATION_MARKER = leaflet.icon({
    iconUrl: blackLocationIcon,
    iconSize: [30, 45],
});
// A red location marker graphic
export const CLICKED_LOCATION_MARKER = leaflet.icon({
    iconUrl: redLocationIcon,
    iconSize: [45, 67.5],
});
// A blue location marker graphic
export const USER_LOCATION_MARKER = leaflet.icon({
    iconUrl: blueLocationIcon,
    iconSize: [45, 67.5],
});

/**
 * Leaflet Map Defaults
 */
// the default zoom of the Leaflet Map
export const DEFAULT_MAP_ZOOM: number = 14;
// the default starting position of the Map (Boston, MA)
export const DEFAULT_MAP_CENTER: Coordinate = [42.341689323556885, -71.10989837318938];
// Open Street Mapa is the Leaflet tile provider for this application
export const DEFAULT_TILE_PROVIDER: string =
    ('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');
// The transport map is the default style of the map as public transport is very important
// in the context of food security.
export const DEFAULT_MAP_STYLE: string =
    ("https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=44ac7b0102d24426ae1cb22a8a358158");

/**
 * Other Defaults
 */
// the dictionary of explicit words being used to filter out the input text from the form.
export const DEFAULT_FILTER = new Filter();
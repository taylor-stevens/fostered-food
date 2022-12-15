import { Coordinate } from '../../backend/types/Types';
import * as leaflet from 'leaflet';
import { LatLng } from 'leaflet';
let blackLocationIcon = require('../images/mapLocationIconBlack.png');
let redLocationIcon = require('../images/mapLocationIconRed.png');
let blueLocationIcon = require('../images/mapLocationIconBlue.png');
let Filter = require('bad-words')

export type ColSpec = boolean | 'auto' | number;

/**
 * Location Marker Defaults
 */
// the default location marker graphic (A black location marker graphic)
export const BLACK_LOCATION_MARKER_URL = blackLocationIcon;
export const DEFAULT_LOCATION_MARKER = leaflet.icon({
    iconUrl: BLACK_LOCATION_MARKER_URL,
    iconSize: [30, 45],
});
// A red location marker graphic
export const RED_LOCATION_MARKER_URL = redLocationIcon;
export const CLICKED_LOCATION_MARKER = leaflet.icon({
    iconUrl: RED_LOCATION_MARKER_URL,
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
// the default speed that the map will move when re-rendering
export const DEFAULT_ZOOM_SPEED: number = 1.5;
// the default starting position of the Map (Boston, MA)
export const DEFAULT_MAP_CENTER: Coordinate = [42.341689323556885, -71.10989837318938];
// the default starting position of the Map (Boston, MA)
// @ts-ignore
export const DEFAULT_MAP_CENTER_LEAFLET: LatLng = new LatLng(DEFAULT_MAP_CENTER[0], DEFAULT_MAP_CENTER[1]);
// Open Street Maps is the Leaflet tile provider for this application
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
// the message displayed when fetching from the database for the fridge data fails.
export const DEFAULT_DATA_FETCH_FAIL_MSG: string = 'Fridge Data is Currently Unavailable. Try Again Later.';

/**
 * Bootstrap / Text Formatting Defaults
 */
// 'warning' is Bootstraps yellow color.
export const DEFAULT_POPUP_COLOR: string = 'warning';
// 'light' is Bootstraps light grey color.
export const DEFAULT_BUTTON_COLOR: string = 'light';
// ''secondary' is Bootstraps dark grey color.
export const SECONDARY_BUTTON_COLOR: string = 'secondary';
// 'auto' is Bootstraps way of adjusting shells to fit content
export const DEFAULT_CONTAINER_RESIZE: ColSpec = 'auto';
// size 12 is a consistent size for small text
export const DEFAULT_TEXT_SIZE: number = 12;
// bold for Bootrap elements
export const HEAVY_WEIGHT: string = 'bold';
// 'danger' is Bootstraps red color.
export const DEFAULT_SELECTED_PAGE_COLOR: string = 'danger';
// 'outline-danger' is Bootstraps red-outline color.
export const DEFAULT_UNSELECTED_PAGE_COLOR: string = 'outline-danger';

/**
 * Testing defaults
 */
// test data that would be provided by the database, but shortened for testing
export const DEFAULT_TESTING_FRIDGE_DATA = [
    {"name":"fridge0","address":"address0","location":[0,0],"contact":[],"lastOpen":"openDate0",
        "posts":[['post0', 'january'], ['post1', 'february'], ['post2', 'march']],
        "temperature":0,"distance":-1},
    {"name":"fridge1","address":"address1","location":[1,1],"contact":[],"lastOpen":"openDate1","posts":[],"temperature":1,"distance":-1},
    {"name":"fridge2","address":"address2","location":[2,2],"contact":[],"lastOpen":"openDate2","posts":[],"temperature":2,"distance":-1},
];
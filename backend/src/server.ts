import { Fridge } from "../types/Types";
import {
    DEFAULT_PORT_NUMBER as portNumber,
    DATABASE_SHEET_ID as sheetID,
    STATIC_INFO_SHEET_RANGE as staticRange,
    TEMP_INFO_SHEET_RANGE as tempRange
} from '../constants/constants';
import {sheetToFridge} from "../utils/utils";
const express = require('express');
const { google } = require('googleapis');

/**
 * Posts {@link Fridge} information from the database to be read in by the front-end.
 */
export async function postFridgeInformation() {
    let fridgeArray = await retrieveFridgeInformation();
    // Express set-up information outlining where the information should be sent
    const app = express();
    const port = process.env.PORT || portNumber;
    // displays message that the server running and listening to specified port
    app.listen(port, () => console.log(`Listening on port ${port}`));

    app.get('/fridge_info', (req: any, res: any) => {
        res.send({ express: fridgeArray });
    });
}

/**
 * Retrieves the fridge sensor information and the fridge static information and transforms it into a list of
 * Fridge objects from the information found in the Google Sheets.
 * @returns The array of transformed {@link Fridge} fridges
 */
async function retrieveFridgeInformation(): Promise<Fridge[]> {
    // get the static information of the fridges from the Google sheets
    let fridgeArr: any[][] = await getGoogleSheetsInformation(sheetID, staticRange);
    // get the temperature information of the fridges from the Google sheets
    let tempArr: any[][] = await getGoogleSheetsInformation(sheetID, tempRange);
    // create the Fridges from the database rows.
    return sheetToFridge(fridgeArr, tempArr);
}

/**
 * Makes a call to the Google Sheets containing information about the fridge
 * and returns an array of the values contained in that sheet.
 * @param spreadsheetId {string} represents the Google sheets document that is being requested from.
 * @param range {string} represents the range within the Google sheets document to be requested.
 */
async function getGoogleSheetsInformation(spreadsheetId: string, range: string): Promise<any[][]> {
    const auth = new google.auth.GoogleAuth({
        keyFile: './data/keys.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets" //url to spreadsheets API
    });
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId: spreadsheetId, // spreadsheet id
        range: range //range of cells to read from.
    });
    return (readData.data.values || []);
}

// run the server file
postFridgeInformation().then(r => console.log('Server Fetch Complete.'));
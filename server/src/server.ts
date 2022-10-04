import { Fridge } from "./Types";
import {google, sheets_v4} from "googleapis";
// import keys from '../data/keys.json';
const express = require('express');

/**
 * Posts fridge information to set database to be read in by the front-end
 * @param fridges The array of {@link BasicFridge} that will eventually be transformed into the {@link Fridge} interface
 */
export async function postFridgeInformation() {
    let fridgeArray = await retrieveFridgeInformation();

    // Express set-up information outlining where the information should be sent
    const app = express();
    const port = process.env.PORT || 5001;
    // This displays message that the server running and listening to specified port
    app.listen(port, () => console.log(`Listening on port ${port}`));

    app.get('/fridge_info', (req: any, res: any) => {
        res.send({ express: fridgeArray });
    });
}

/**
 * Retrieves the fridge sensor information and the fridge static information and transforms it into a list of
 * Fridge objects from the information found in the google sheets.
 * @returns The array of transformed {@link Fridge} fridges
 */
async function retrieveFridgeInformation() {
    let fridgeArr = await getGoogleSheetsInformation(
        '1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk',
        'Static Fridge Information!A2:E'
    );
    let tempArr = await getGoogleSheetsInformation(
        '1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk',
        'Current Temperature Data Fahrenheit!A2:D',
    );
    let sheetToFridge: { name: string; address: string; location: number[]; contact: string[][]; lastOpen: string; posts: string[][]; temperature: number; distance: number; }[] = []
    fridgeArr.forEach((row: string[]) => {
        // take string such as "instagram:@woofridge, website:https://woofridge.org/"
        // and make it into a nested list: [["instagram", "woofridge"], ["website", "https://woofridge.org/"]
        let contacts = row[4] ? row[4].split(',').map(contact =>
            [contact.substring(0, contact.indexOf(':')), contact.substring(contact.indexOf(':') + 1, contact.length)]
        ) : [];
        let temperatureInfo: string[] = tempArr.find((location: string[]) => location[0] === row[0]) || [];
        sheetToFridge.push({
            name: row[1],
            address: row[2],
            location: row[3].split(',', 2).map(coord => parseFloat(coord)) || [null, null],
            contact: contacts,
            lastOpen: temperatureInfo[3],
            posts: [],
            temperature: parseFloat(temperatureInfo[1]),
            distance: -1,
        })
    })
    console.log(sheetToFridge)
    return sheetToFridge;
}

/**
 * Makes a call to the Google Sheets containing information about the fridge
 * and returns an array of the values contained in that sheet.
 */
async function getGoogleSheetsInformation(spreadsheetId: string, range: string): Promise<any[][]> {
    const auth = new google.auth.GoogleAuth({
        keyFile: '../data/keys.json',
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

postFridgeInformation();
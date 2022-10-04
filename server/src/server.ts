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
 * Retrieves the fridge sensor information from multiple sources
 * @param fridges The array of {@link BasicFridge} that will eventually be transformed into the {@link Fridge} interface
 * @returns The array of transformed {@link Fridge} fridges
 */
async function retrieveFridgeInformation() {
    let fridgeArr = await getFridgeInformation();
    // console.log(fridgeArr)
    let tempArr = await getTemperatureInformation();
    // console.log(tempArr)
    let sheetToFridge: { name: string; address: string; location: number[]; contact: string[][]; lastOpen: string; posts: string[][]; temperature: number; distance: number; }[] = []
    fridgeArr.forEach((row: string[]) => {
        // take string such as "instagram:@woofridge, website:https://woofridge.org/"
        // and make it into a nested list: [["instagram", "woofridge"], ["website", "https://woofridge.org/"]
        // console.log(row)
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

async function getFridgeInformation(): Promise<any[][]> {
    const auth = new google.auth.GoogleAuth({
        keyFile: '../data/keys.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets" //url to spreadsheets API
    });
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    // https://docs.google.com/spreadsheets/d/1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk/edit#gid=0
    const spreadsheetId = "1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk";

    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: 'Static Fridge Information!A2:E' //range of cells to read from.
    });
    // console.log(JSON.stringify(readData.data)
    return (readData.data.values || []);
}

async function getTemperatureInformation(): Promise<any[][]> {
    const auth = new google.auth.GoogleAuth({
        keyFile: '../data/keys.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets" //url to spreadsheets API
    });
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    // https://docs.google.com/spreadsheets/d/1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk/edit#gid=0
    const spreadsheetId = "1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk";

    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: 'Current Temperature Data Fahrenheit!A2:D'//range of cells to read from.
    });
    // console.log(JSON.stringify(readData.data)
    return (readData.data.values || []);
}

postFridgeInformation();
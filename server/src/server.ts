import { BasicFridge, Fridge } from "./Types";
import fridgeJSON from "../data/fridges.json"
const express = require('express');
const { google } = require("googleapis");

function postFridgeInformation(fridge: BasicFridge[]): void {

    retrieveFridgeInformation(fridge).then(val => {
        app.get('/fridge_info', (req: any, res: any) => {
            res.send({ express: val });
        });
    });
}

async function retrieveFridgeInformation(fridges: BasicFridge[]): Promise<Fridge[]> {
    let fridgeArr: Fridge[] = [];
    fridges.forEach(async (fridgeInformation: BasicFridge) => {
        const name = fridgeInformation.name;
        const address = fridgeInformation.address;
        const coordinates = fridgeInformation.coordinates;
        const contact = fridgeInformation.contact;

        let sheetValues: any[] = await getFridgeInformation(fridgeInformation)
        fridgeArr.push({
            name: name,
            address: address,
            location: coordinates,
            contact: contact,
            lastOpen: sheetValues[1],
            posts: [],
            temperature: sheetValues[0]
        });
    })
    return fridgeArr
}

export async function getFridgeInformation(fridgeInformation: {name: string, sheetPage: string, address: string, coordinates: number[], contact: string[]}): Promise<any[]> {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./data/keys.json", //the key file
        scopes: "https://www.googleapis.com/auth/spreadsheets" //url to spreadsheets API
    });
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const spreadsheetId = "1hahPzF9nLYMy63Xl84mJ3yZoj4_2EAB9h7WkY9RQxKU";

    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: `${fridgeInformation.sheetPage}!A1:B1`, //range of cells to read from.
    });
    // let val = readData.data.values[0];

    return readData.data.values
}

postFridgeInformation(fridgeJSON)

const app = express();
const port = process.env.PORT || 5001;
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

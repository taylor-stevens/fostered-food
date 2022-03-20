import { Fridge } from "./Types";
const express = require('express');
const { google } = require("googleapis");

export function adaptJsonInformation(fridgeInformation: { name: string, address: string, coordinates: number[], contact: string[] }): Fridge {
    const name = fridgeInformation.name;
    const address = fridgeInformation.address;
    const coordinates = fridgeInformation.coordinates;
    const contact = fridgeInformation.contact;

    return {
        name: name,
        address: address,
        location: coordinates,
        contact: contact,
        lastOpen: "00/00/00",
        posts: [],
        temperature: 0
    };
}

export function getFridgeTemperature(fridgeId: string) {

}

// Function for getting fridge posts

// function for getting last open date

export async function updateFridgeInformation(fridgeId: string) {
    const app = express();
    const port = process.env.PORT || 5001;
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
        range: "Sheet1!A:A", //range of cells to read from.
    });
    let val = readData.data.values[0];

    app.get('/fridge_info', (req, res) => { //Line 9
        res.send({ express: `${val}` });
    });

    // This displays message that the server running and listening to specified port
    app.listen(port, () => console.log(`Listening on port ${port}`));

    return val
}

import { BasicFridge, Fridge } from "../Types";
const { google } = require("googleapis");

/**
 * Using the {@link BasicFridge}'s postInformation field retrieves the sensor data
 * @param fridgeInformation The {@link BasicFridge} that has to be transformed
 * @returns An array of information pulled from the Google Sheet
 */
async function getFridgeInformation(fridgeInformation: BasicFridge): Promise<any[]> {
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
    return readData.data.values[0]
}

/**
 * Pulls the sensor data of a fridge from a set Google Sheet database
 * @param fridgeInformation The basic fridge object that has to be updated with sensor information
 * @returns The transformed {@link Fridge} including temperature and last open date information
 */
export async function sheet2fridge(fridgeInformation: BasicFridge): Promise<Fridge> {
    let sheetValues: any[] = await getFridgeInformation(fridgeInformation)
    return {
        name: fridgeInformation.name,
        address: fridgeInformation.address,
        location: fridgeInformation.coordinates,
        contact: fridgeInformation.contact,
        lastOpen: new Date(sheetValues[1]),
        posts: [],
        temperature: parseInt(sheetValues[0]),
        distance: -1,
    };
}
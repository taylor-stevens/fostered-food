import { Fridge } from "../Types";
const { google } = require("googleapis");

/**
 * Using the {@link BasicFridge}'s postInformation field retrieves the sensor data
 * @param fridgeInformation The {@link BasicFridge} that has to be transformed
 * @returns An array of information pulled from the Google Sheet
 */
export async function getFridgeInformation(): Promise<any[]> {
    const auth = new google.auth.GoogleAuth({
        keyFile: "", //TODO: the key file
        scopes: "https://www.googleapis.com/auth/spreadsheets" //url to spreadsheets API
    });
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    // https://docs.google.com/spreadsheets/d/1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk/edit#gid=0
    const spreadsheetId = "1zHYl2xHihLmtCkv6LjJm_HUZv56B33ooNmlX42HlCDk";

    const readData = await googleSheetsInstance.spreadsheets.values.batchGet({
        // auth, //auth object
        spreadsheetId, // spreadsheet id
        ranges: ['Static Fridge Information!A2:E'], //range of cells to read from.
    });
    console.log(readData);
    return readData;
}

/**
 * Pulls the sensor data of a fridge from a set Google Sheet database
 * @param fridgeInformation The basic fridge object that has to be updated with sensor information
 * @returns The transformed {@link Fridge} including temperature and last open date information
 */
// export async function sheet2fridge(): Promise<Fridge[]> {
//     let sheetValues = await getFridgeInformation();
//     return {
//         name: fridgeInformation.name,
//         address: fridgeInformation.address,
//         location: fridgeInformation.coordinates,
//         contact: fridgeInformation.contact,
//         lastOpen: new Date(sheetValues[1]),
//         posts: [],
//         temperature: parseInt(sheetValues[0]),
//         distance: -1,
//     };
// }
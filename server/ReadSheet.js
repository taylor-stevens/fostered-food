const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "/keys.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

export default async function getTemp() {

    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const spreadsheetId = "1hahPzF9nLYMy63Xl84mJ3yZoj4_2EAB9h7WkY9RQxKU";

    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "Sheet1!A:A", //range of cells to read from.
    });
    let val = readData.data.values[0];
    console.log(val);
    return val
}
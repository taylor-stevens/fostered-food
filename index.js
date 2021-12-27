const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

async function foo() {

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const spreadsheetId = "1JuMSoKR4LUBVUghvsYnsDRzh50Sdn9GfMlsqAGRpZcg";

  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:A", //range of cells to read from.
  });

  console.log(readData.data.values[0]);
}

foo();
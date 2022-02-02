const express = require('express'); 
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "./keys.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

async function getTemp() {
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

const app = express();
const port = process.env.PORT || 5000; 

getTemp().then(fridge => {
    app.get('/fridge_info', (req, res) => { //Line 9
        res.send({ express: `${fridge}` });
      });  
})

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// // create a GET route
// app.get('/fridge_info', (req, res) => { //Line 9
//   res.send({ express: `YOUR EXPRESS BACKEND IS CONNECTED TO REACT` });
// }); 
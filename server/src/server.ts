import { BasicFridge, Fridge } from "./Types";
import fridgeJSON from "../data/fridges.json"
import { sheet2fridge } from "./utils/Sheet2Fridge";
import { fetch2fridge } from "./utils/Fetch2Fridge";
const express = require('express');

async function postFridgeInformation(fridge: BasicFridge[]): Promise<any> {

    let fridgeArray = await retrieveFridgeInformation(fridge)
    app.get('/fridge_info', (req: any, res: any) => {
        res.send({ express: fridgeArray });
    });

}

async function retrieveFridgeInformation(fridges: BasicFridge[]): Promise<Fridge[]> {
    let fridgeArr: Fridge[] = [];
    fridges.forEach(async (fridgeInformation: BasicFridge) => {
        let newFridge: Fridge;
        if (fridgeInformation.postInformation.type === 'wirelessTag') {
            newFridge = await fetch2fridge(fridgeInformation);
        } else {
            newFridge = await sheet2fridge(fridgeInformation);
        }
        fridgeArr.push(newFridge)
    })
    return fridgeArr
}

postFridgeInformation(fridgeJSON)

const app = express();
const port = process.env.PORT || 5001;
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

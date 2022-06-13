import { BasicFridge, Fridge } from "./Types";
import fridgeJSON from "../data/fridges.json"
import { sheet2fridge } from "./utils/Sheet2Fridge";
import { fetch2fridge } from "./utils/Fetch2Fridge";
const express = require('express');

/**
 * Posts fridge information to set database to be read in by the front-end
 * @param fridges The array of {@link BasicFridge} that will eventually be transformed into the {@link Fridge} interface
 */
export async function postFridgeInformation(fridges: BasicFridge[]): Promise<any> {
    let fridgeArray = await retrieveFridgeInformation(fridges)

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
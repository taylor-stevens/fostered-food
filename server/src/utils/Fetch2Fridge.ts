const fetch = require("node-fetch");
import { parseString } from 'xml2js'
import { BasicFridge, Fridge } from '../Types';

/**
 * Converts a {@link BasicFridge} to a {@link Fridge} by fetching the proper Wireless Tag sensor information
 * @param fridgeJson The {@link BasicFridge} that uses a Wireless Tag sensor to collect information 
 * @returns The {@link Fridge} of the transormed parameter
 */
export async function fetch2fridge(fridgeJson: BasicFridge): Promise<Fridge> {
    let wirelessTagData = await fetch(`https://www.mytaglist.com/ethLogShared.asmx/GetLatestTemperatureRawDataByUUID?uuid=${fridgeJson.postInformation.id}`)
    let returnedXml = await wirelessTagData.text()
    let node: Fridge = {
        name: fridgeJson.name,
        address: fridgeJson.address,
        location: fridgeJson.coordinates,
        contact: fridgeJson.contact,
        lastOpen: new Date(),
        posts: [],
        temperature: 0,
        distance: -1
    }
    parseString(returnedXml,  ((err: Error | null, result: any) => {
        node.lastOpen = new Date(result.TemperatureDataPoint.time[0]);
        node.temperature = parseInt(result.TemperatureDataPoint.temp_degC[0])
    }))
    return node
}
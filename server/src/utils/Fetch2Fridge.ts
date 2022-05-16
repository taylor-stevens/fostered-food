const fetch = require("node-fetch");
import { parseString } from 'xml2js'
import { BasicFridge, Fridge } from '../Types';


export async function fetch2fridge(fridgeJson: BasicFridge): Promise<Fridge> {
    let lastOpen: string;
    let temperature: number;
    let wirelessTagData = await fetch(`https://www.mytaglist.com/ethLogShared.asmx/GetLatestTemperatureRawDataByUUID?uuid=${fridgeJson.postInformation.id}`)
    let returnedXml = await wirelessTagData.text()
    let node: Fridge = {
        name: fridgeJson.name,
        address: fridgeJson.address,
        location: fridgeJson.coordinates,
        contact: fridgeJson.contact,
        lastOpen: "",
        posts: [],
        temperature: 0
    }
    parseString(returnedXml,  ((err: Error | null, result: any) => {
        node.lastOpen = result.TemperatureDataPoint.time[0];
        node.temperature = result.TemperatureDataPoint.temp_degC[0]
    }))
    return node
}
const fetch = require("node-fetch");
import { parseString } from 'xml2js'
import { BasicFridge, Fridge } from '../Types';


export async function fetch2fridge(fridgeJson: BasicFridge): Promise<Fridge> {
    let lastOpen: string;
    let temperature: number;
    let wirelessTagData = fetch(`https://www.mytaglist.com/ethLogShared.asmx/GetLatestTemperatureRawDataByUUID?uuid=${fridgeJson.postInformation.id}`)
    let returnedXml = await wirelessTagData.text()
    console.log(returnedXml)
    parseString(returnedXml, ((err: Error | null, result: any) => {
        lastOpen = result.TemperatureDataPoint.time;
        temperature = result.TemperatureDataPoint.temp_degC
    }))
    return {
        name: fridgeJson.name,
        address: fridgeJson.address,
        location: fridgeJson.coordinates,
        contact: fridgeJson.contact,
        lastOpen: "",
        posts: [],
        temperature: 2
    };
}
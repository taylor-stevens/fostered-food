import { BasicFridge, Fridge } from '../Types';
import { sheet2fridge } from '../utils/Sheet2Fridge'

describe('Tests for pulling fridge information from Wireless Tag API', () => {
    let basicFridge: BasicFridge =   {
        "name": "South End Community Fridge",
        "sheetPage": "South End",
        "address": "549 Columbus Avenue",
        "coordinates": [42.34162565042275, -71.08093104441139],
        "contact": [],
        "postInformation": {
          "type": "googleSheet",
          "id": "000" 
        }
      }

      test('Comparing Wireless Tag Fridge name', async () => {
        let transformedData: Fridge = await sheet2fridge(basicFridge);
        expect('South End Community Fridge').toBe(transformedData.name);
      });
    
      test('Comparing Wireless Tag Fridge address', async () => {
        let transformedData: Fridge = await sheet2fridge(basicFridge);
        expect('549 Columbus Avenue').toBe(transformedData.address);
      });
    
      test('Comparing Wireless Tag Fridge location', async () => {
        let transformedData: Fridge = await sheet2fridge(basicFridge);
        expect(transformedData.location).toEqual([42.34162565042275, -71.08093104441139]);
      });
    
      test('Comparing Wireless Tag Fridge location', async () => {
        let transformedData: Fridge = await sheet2fridge(basicFridge);
        expect(transformedData.temperature).toBeGreaterThanOrEqual(-0);
      });
    
      test('Comparing Wireless Tag Fridge last opened date', async () => {
        let transformedData: Fridge = await sheet2fridge(basicFridge);
        expect(transformedData.lastOpen.getTime()).toBeGreaterThanOrEqual(1640235600000);
      });
})
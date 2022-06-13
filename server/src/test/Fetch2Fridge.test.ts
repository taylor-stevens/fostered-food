import { BasicFridge, Fridge } from '../Types';
import { fetch2fridge } from '../utils/Fetch2Fridge'

describe('Tests for pulling fridge information from Wireless Tag API', () => {
  let basicFridge: BasicFridge = {
    "name": "Symphony Community Fridge",
    "sheetPage": "Symphony",
    "address": "70 St. Stephen Street",
    "coordinates": [42.34172876773847, -71.08751130412465],
    "contact": [],
    "postInformation": {
      "type": "wirelessTag",
      "id": "b5054cb3-6dd1-4847-baab-a1e001211f94"
    }
  }

  test('Comparing Wireless Tag Fridge name', async () => {
    let transformedData: Fridge = await fetch2fridge(basicFridge);
    expect('Symphony Community Fridge').toBe(transformedData.name);
  });

  test('Comparing Wireless Tag Fridge address', async () => {
    let transformedData: Fridge = await fetch2fridge(basicFridge);
    expect('70 St. Stephen Street').toBe(transformedData.address);
  });

  test('Comparing Wireless Tag Fridge location', async () => {
    let transformedData: Fridge = await fetch2fridge(basicFridge);
    expect(transformedData.location).toEqual([42.34172876773847, -71.08751130412465]);
  });

  test('Comparing Wireless Tag Fridge location', async () => {
    let transformedData: Fridge = await fetch2fridge(basicFridge);
    expect(transformedData.temperature).toBeLessThanOrEqual(-0);
  });

  test('Comparing Wireless Tag Fridge last opened date', async () => {
    let transformedData: Fridge = await fetch2fridge(basicFridge);
    expect(transformedData.lastOpen.getTime()).toBeGreaterThanOrEqual(1649651855000);
  });
})
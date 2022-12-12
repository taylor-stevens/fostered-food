/**
 * Represents a two number list where the first number is the latitude and the second
 * number is the longitude. The expected format is as such [latitude: number, longitude: number]
 */
export type Coordinate = number[];

export type TemperatureData = {
    // the fridge ID for a given fridge (for example 'JPCF')
    id: string,
    // the temperature of a given fridge (for example 32)
    temperature: number,
    // the date that the fridge was last opened, based on sensor data (for example '10/2/2022 14:04')
    lastOpen: string,
    // an associated database row number (for example 15)
    rowId: number,
};

// type to help with automated testing
export type TestData = {
    testName: string,
    providedInput: any;
    expectedOutput: any;
}

// an object outlining the information of a community fridge.
export type Fridge = {
    // the name of the fridge (for example 'Symphony Community Fridge')
    name: string,
    // the address of where to find the fridge (for example '7 Saint Stephen St, Boston MA')
    address: string,
    // the date that the fridge was last opened, based on sensor data (for example '10/2/2022 14:04')
    lastOpen: string,
    // the current temperature in degrees fahrenheit of the fridge (for example 32)
    temperature: number,
    // the location of the fridge in latitude and longitude coordinates
    location: Coordinate,
    // the different forms of contact that this IFridge has with the information
    contact: string[][], // (for example [["instagram", "fridge_instagram"],])
    // an array text posted about this Fridge as well as its associated timestamp
    posts: string[][], // (for example [["apples", "12 Jan 22, 3:00PM"],])
    // originally set to -1, this is the distance from the users current location to this Fridge.
    distance: number,
};
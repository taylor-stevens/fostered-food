/**
 * Represents a two number list where the first number is the latitude and the second number is the longitude
 * such as [latitude: number, longitude: number]
 */
export type Coordinate = number[];

/**
 * The fields belonging to a Fridge based on geographic and sensor information.
export type Fridge = {
    name: string,
    address: string,
    lastOpen: Date,
    temperature: number,
    location: number[],
    contact: string[][],    // the different forms of contact that this IFridge has with the information
                            // ex: [["instagram", "fridge_instagram"],]
    posts: any[][]  // an array of images and associated text posted about this
                    // IFridge with timestamps ex: [["apples", "12 Jan 22, 3:00PM"],]
    distance: number,
}

/**
 * An object outlining the information of a community fridge that can be retrieved without a sensor
 */
export type Fridge = {
    /**
     * The name of the fridge, for example 'Symphony Community Fridge'
     */
    name: string,

    /**
     * The address of where to find the fridge, for example '7 Saint Stephen St, Boston MA'
     */
    address: string,

    /**
     * The date that the fridge was last opened, based on sensor data, for example '10/2/2022 14:04'
     */
    lastOpen: string,

    /**
     * The current temperature in degrees fahrenheit of the fridge, for example 32
     */
    temperature: number,

    /**
     * The location of the fridge in latitude and longitude coordinates, for example
     * [42.34172876773847, -71.08751130412465]
     */
    location: Coordinate,

    /**
     * The different forms of contact that this IFridge has with the information for example
     * [["instagram", "fridge_instagram"],]
     */
    contact: string[][],

    /**
     * An array text posted about this Fridge as well as its associated timestamp, for example
     * [["apples", "12 Jan 22, 3:00PM"],]
     */
    posts: string[][]

    /**
     * Originally set to -1, this is the distance from the users current location to this Fridge.
     */
    distance: number,
}
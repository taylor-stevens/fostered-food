/**
 * The fields belonging to a Fridge based on geographic and sensor information
 */
export type Fridge = {
    name: string,
    address: string,
    lastOpen: string,
    temperature: number,
    location: number[],
    contact: string[], // the different forms of contact that this IFridge has
    posts: any[] // an array of images and associated text posted about this IFridge
}

/**
 * An object outlining the information of a community fridge that can be retrivied without a sensor 
 */
export type BasicFridge = { 
    name: string,
    sheetPage: string,
    address: string,
    coordinates: number[],
    contact: string[],
    postInformation: {type: string, id: string}
}
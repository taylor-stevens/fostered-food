/*
 * Represents the data that would be stored about a given community fridge.
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
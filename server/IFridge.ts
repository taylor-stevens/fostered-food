
/*
 * Represents the data that would be stored about a given community fridge.
 */
export interface IFridge {

    name: string;
    address: string;
    lastOpen: string;
    temperature: number;
    contact: string[]; // the different forms of contact that this IFridge has
    posts: any[]; // an array of images and associated text posted about this IFridge

    getName(): string;
    getAddress(): string;
    getLastOpen(): string;
    getTemperature(): string;
    getContact(): string[];
    getPosts(): any[];
}
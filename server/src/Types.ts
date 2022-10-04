/**
 * The fields belonging to a Fridge based on geographic and sensor information
 */
export type Fridge = {
    name: string,
    address: string,
    lastOpen: Date,
    temperature: number,
    location: number[],
    coordinates: number[],
    contact: string[][],    // the different forms of contact that this IFridge has with the information
                            // ex: [["instagram", "fridge_instagram"],]
    posts: any[][]  // an array of images and associated text posted about this
                    // IFridge with timestamps ex: [["apples", "12 Jan 22, 3:00PM"],]
    distance: number,
}
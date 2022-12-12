import {Coordinate, Fridge, TemperatureData} from "../types/Types";
import {
    FRIDGE_ADDRESS_COL as fridgeAddressColumn, FRIDGE_COORDINATE_COL as fridgeCoordinateColumn,
    FRIDGE_ID_COL as fridgeIDColumn, FRIDGE_LAST_OPEN_COL as fridgeLastOpenColumn,
    FRIDGE_NAME_COL as fridgeNameColumn, FRIDGE_TEMP_COL as fridgeTemperatureColumn,
    SOCIAL_COL as socialColumn,
    ID_COL as rowIDColumn,
} from "../constants/constants";

/**
 * Takes in two nested arrays of Row objects pulled from Google Sheets databases and parses the values
 * in each, combining the two sets of data based on the fridge IDs and returning a list of {@link Fridge}s
 * based off the data that is found between the two Google Sheet databases.
 * @param fridgeStaticData {any[][]} data pulled from Google Sheets from the Static Fridge Information Page
 * @param fridgeTemperatureData {any[][]} data pulled from Google Sheets from the Current Temperature Data Page
 * @return {Fridge[]} A list of {@link Fridge}s based on a nested array of Row objects pulled from the
 *                    Google Sheets database.
 */
export function sheetToFridge(fridgeStaticData: any[][], fridgeTemperatureData: any[][]): Fridge[] {
    // determine the return type for the function.
    let sheetToFridge: Fridge[] = []

    // go through all the fridges listed on the static information page
    fridgeStaticData.forEach((row: string[]) => {
        // the name of the Fridge represented by the row
        let name = row[fridgeNameColumn];
        // the address of the Fridge represented by the row
        let address = row[fridgeAddressColumn];
        // the coordinates of the Fridge represented by the row or '[undefined, undefined]'
        let location: Coordinate = [];
        if (typeof row[fridgeCoordinateColumn] === 'string') {
            let stringCoords: string = row[fridgeCoordinateColumn];
            let splitCoordinates = stringCoords.split(',', 2); //.split(',', 2);
            let floatCoordinates = splitCoordinates.map(coordinate => parseFloat(coordinate));
            location = floatCoordinates || [undefined, undefined];
        }
        // get the corresponding contact information data returned from the Google Sheet data, if it exists.
        let contactInformation = contactToNestedList(row[socialColumn]);
        /**
         * Get the corresponding temperature data based on the ID in both
         * of the returned Google Sheet data, if it exists.
         */
        const { temperature, lastOpen } = getAssociatedTemperatureData(row[fridgeIDColumn], fridgeTemperatureData);

        // add the Fridge object to the sheetToFridge list that will be pushed to the server.
        sheetToFridge.push({
            name: name,
            address: address,
            location: location,
            contact: contactInformation,
            lastOpen: lastOpen,
            // the default for posts is currently empty as there is no data persistence for fridge posts
            posts: [],
            temperature: temperature,
            // default value for fridge distance to user as user location is not known until they request to be found
            distance: -1,
        });
    });
    return sheetToFridge;
}

/**
 * Takes in a string such as 'instagram:@woofridge, website:https://woofridge.org/', as retrieved from
 * the Google Sheets database and converts this into a nested list of contacts, in this case, the contact
 * list would return as [['instagram', '@woofridge'], ['website', 'https://woofridge.org/']. If the contact
 * string is improperly formatted, will return the data as ['contact', 'unavailable'].
 * @param contactString {string} the string to be converted into a nested list of the contact information
 * @return {string[][]} A nested list containing the contact information, organized in a parsable manner.
 */
export function contactToNestedList(contactString: string): string[][] {
    let contacts: string[] = [];
    if (typeof contactString === 'string') {
        contacts = contactString.split(', ');
    }
    const mappedContacts: string[][] = contacts.map((contact) => {
        let mediaType: string;
        let mediaHandle: string;
        let contactStringLength = contact.length;
        let typeHandleSeparatorIndex = contact.indexOf(':');

        if (typeHandleSeparatorIndex == -1) {
            mediaType = 'contact';
            mediaHandle = 'unavailable';
        } else {
            mediaType = contact.substring(0, typeHandleSeparatorIndex);
            mediaHandle = contact.substring(typeHandleSeparatorIndex + 1, contactStringLength);
        }

        return [mediaType, mediaHandle];
    });
    return mappedContacts;
}

/**
 * Gets the corresponding temperature data based on the fridge ID in the fridge temperature data returned
 * from Google Sheets, if it exists. Otherwise, return -1 for the row ID,
 * a blank string for the lastOpen date, and -1 for the current temperature.
 * @param fridgeID {string} the string code associated with
 * @param fridgeTemperatureData {any[][]} data pulled from Google Sheets from the Current Temperature Data Page
 */
export function getAssociatedTemperatureData(fridgeID: string, fridgeTemperatureData: any[][]): TemperatureData {
    let matchingRowTempData = fridgeTemperatureData.find(
        (location: string[]) => location[fridgeIDColumn] === fridgeID
    );
    let tempData: TemperatureData;
    if (matchingRowTempData) {
        tempData = {
            id: fridgeID,
            temperature: parseFloat(matchingRowTempData[fridgeTemperatureColumn]),
            lastOpen: matchingRowTempData[fridgeLastOpenColumn],
            rowId: matchingRowTempData[rowIDColumn]
        };
    } else {
        tempData = {
            id: fridgeID,
            temperature: -1,
            lastOpen: '',
            rowId: -1
        };
    }
    return tempData;
}
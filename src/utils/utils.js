
/**
 * Returns a compare function that is set up to check for the given parameter prop and
 * determine the order in which two Fridges should be organized in a list.
 * @param prop the object field that will be used to order the list.
 * @return {(function(*, *): (number))|*}
 */
export function getFridgeOrder(prop) {
    /**
     * This function takes in two Fridge objects, fridgeA & fridgeB, and compares the value
     * of two of its fields, chosen by prop. If fridgeA has a greater value for the given field,
     * 1 is returned, if fridgeB has a greater value for the given field, then -1 is returned,
     * else 0 is returned by this function.
     */
    return function(fridgeA, fridgeB) {
        if (fridgeA[prop] > fridgeB[prop]) {
            return 1;
        } else if (fridgeA[prop] < fridgeB[prop]) {
            return -1;
        }
        return 0;
    }
}

/**
 * Uses the getFridgeOrder function to sort the given list of fridges using 'distance' as the prop
 * field to compare by.
 * @param fridges the list of fridges that the function will sort and return.
 * @return a list of Fridges sorted on their 'distance' field.
 */
export function sortByDistanceToFridge(fridges) {
    // const sortedFridgeList = fridges.concat();
    return fridges.sort(getFridgeOrder('distance'));
}

/**
 * For each fridge in the list of fridges, set the 'distance' field for each Fridge
 * based on the userLocation provided.
 * @param fridges the list of fridges to go through and update the 'distance' field on.
 * @param userLocation the current location (LtLng) of the user, produced by Leaflet.
 */
export function setDistanceFromUser(fridges, userLocation) {
    fridges.forEach((fridge) => {
        // for each fridge, calculate the distance between the user and the fridge, converting this
        // to miles, and truncating the value to 2 digit places.
        fridge.distance = (userLocation.distanceTo(fridge.location) * 0.000621371192).toFixed(2)
    })
}
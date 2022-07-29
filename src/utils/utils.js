/**
 * Calculates the distance between two coordinates (latitude and longitude). Source:
 * https://www.geeksforgeeks.org/program-distance-two-points-earth.
 * @param lat1 Number representing the latitude of the first location.
 * @param lat2 Number representing the latitude of the second location.
 * @param lon1 Number representing the longitude of the first location.
 * @param lon2 Number representing the longitude of the second location.
 * @return {number}
 */
export function distance(lat1, lat2, lon1, lon2) {

    // The math module contains a function named toRadians which converts from degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in miles. Use 6371 for kilometers
    let r = 3956;

    // calculate the result
    return(c * r);
}

export function getOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
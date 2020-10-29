/**
 * Simple Debugging function to show properties on an object
 * @param {object} obj 
 */
export default function ShowProperties(obj) {
    for (var prop in obj) {
        console.log(prop + ": " + obj[prop] + "\n");
    }
}
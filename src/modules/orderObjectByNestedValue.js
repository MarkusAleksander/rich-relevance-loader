// TODO - test
// * works based on properties in ES6 are ordered chronologically
// * Note - numerical keys are first, ordered by value
// * then non-numerical keys are next, ordered by chronological addition.
// * where dir is either az, za or "" 
function orderObjectByNestedValue(obj, property_path, dir = "") {
    let orderded_obj = {};

    Object.keys(obj).sort((a, b) => {
        // * strings only
        if (dir === "az") {
            return obj[a][property_path].localeCompare(obj[b][property_path]);
        } else if (dir === "za") {
            return obj[b][property_path].localeCompare(obj[a][property_path]);
        } else {
            return 0;
        }
    }).forEach(key => {
        if (!orderded_obj[key]) {
            orderded_obj[key] = obj[key];
        }
    });

    return orderded_obj;
}
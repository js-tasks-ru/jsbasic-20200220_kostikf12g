/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
    if (str === '' || str === null || !str) {
        return '';
    } else {
        return str[0].toUpperCase() + str.slice(1);
    }
}

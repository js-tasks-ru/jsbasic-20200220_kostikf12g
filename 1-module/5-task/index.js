/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
    const endPartString = '…';

    if (str.length > maxlength) {
        return str.slice(0, (maxlength - 1)) + endPartString;
    } else {
        return str;
    }
}

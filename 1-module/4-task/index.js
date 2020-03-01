/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
    const spamString1 = '1XbeT';
    const spamString2 = 'XXX';

    let string = str.toLowerCase();

    if (string.includes(spamString1.toLowerCase()) ||
        string.includes(spamString2.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

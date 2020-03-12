/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
    let result = null;

    for (const key in obj) {
        result = obj[key];
    }

    return (result === null);
}

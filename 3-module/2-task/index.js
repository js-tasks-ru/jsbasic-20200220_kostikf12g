/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
    let resultFilter = str.split(' ');

    for (let item of resultFilter) {
        if (item.includes(',')) {
            let itemResultFilter = item.split(',');

            for (let subItem of itemResultFilter) {
                resultFilter.push(subItem);
            }
        }
    }

    resultFilter = resultFilter
                    .map((item) => parseFloat(item))
                    .filter((item) => isFinite(item));

    return {
        'min': Math.min(...resultFilter),
        'max': Math.max(...resultFilter)
    }
}
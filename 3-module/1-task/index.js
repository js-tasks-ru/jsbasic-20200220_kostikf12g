/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
    let result = [];

    for (let item of data) {
        if (item.age <= age) {
            result.push(item.name + ", " + item.balance);
        }
    }

    return result.join('\n');
}

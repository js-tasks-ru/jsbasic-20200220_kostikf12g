/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
    let result = [];

    for (let item of users) {
        result.push(item.name);
    }

    return result;
}

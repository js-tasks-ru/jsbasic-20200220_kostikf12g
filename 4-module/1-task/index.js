/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
    let ul = document.createElement('ul');

    for (let friend of friends) {
        let { firstName, lastName } = friend;

        let li = document.createElement('li');
        li.innerText = `${firstName} ${lastName}`;
        ul.append(li);
    }

    return ul;
}

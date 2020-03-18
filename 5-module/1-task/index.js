/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    for (let trElement of table.rows) {
        let countTdElements = trElement.cells.length;
        let statusTdElement = trElement.cells[countTdElements - 1];
        let genderTdElement = trElement.cells[countTdElements - 2];
        let ageTdElement = trElement.cells[countTdElements - 3];

        if (statusTdElement.innerText !== "Status") {
            if (statusTdElement.dataset.available === undefined) { 
                trElement.setAttribute('hidden', '');
            } else if (statusTdElement.dataset.available === 'true') {
                trElement.classList.add('available');
            } else {
                trElement.classList.add('unavailable');
            }

            if (genderTdElement.innerText === 'm') {
                trElement.classList.add('male');
            } else {
                trElement.classList.add('female');
            }

            if (parseInt(ageTdElement.innerText) < 18) {
                trElement.style.textDecoration = 'line-through';
            }
        }
    }
}

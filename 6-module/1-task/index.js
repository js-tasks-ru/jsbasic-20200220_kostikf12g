/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
 *
 * @constructor
 */
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');
    this.data = data;

    this.el.classList.add('pure-table');
    this.parseTitles();
    this.parseData();

    this.el.addEventListener("click", event => {
      if (event.target.innerText === 'X') {
        event.preventDefault()

        let idUser = +event.target.closest('tr').getAttribute('data-id');
        this.onRemoved(idUser);
      }
    });
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {
    this.el.querySelector(`[data-id="${id}"]`).remove();
  }

  parseTitles() {
    let thead = document.createElement('thead');
    let titles = document.createElement('tr');

    for (var i = 0; i < 5; i++) {
      let tdTitle = document.createElement('td');

      if (i === 0) {
        tdTitle.innerText = 'Name';
      } else if (i === 1) {
        tdTitle.innerText = 'Age';
      } else if (i === 2) {
        tdTitle.innerText = 'Salary';
      } else if (i === 3) {
        tdTitle.innerText = 'City';
      }

      titles.append(tdTitle);
    }

    thead.append(titles);
    this.el.append(thead);
  }

  parseData() {
    let tbody = document.createElement('tbody');

    for (let user of this.data) {
      let tr = document.createElement('tr');

      for (let key in user) {
        if (key === "id") {
          tr.setAttribute('data-id', user[key]);
          continue;
        }

        let td = document.createElement('td');
        td.innerText = user[key];

        tr.append(td);
      }

      let tdButton = document.createElement('td');
      tdButton.innerHTML = '<a href="#delete">X</a>';
      tr.append(tdButton);

      tbody.append(tr);
    }

    this.el.append(tbody);
  }
}

window.ClearedTable = ClearedTable;

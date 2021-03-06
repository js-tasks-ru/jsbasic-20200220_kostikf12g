/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
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
function SortableTable(items) {

  this.parseTitles = () => {
    let thead = document.createElement('thead');
    let titles = document.createElement('tr');

    for (var i = 0; i < 4; i++) {
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

  this.parseData = () => {
    let tbody = document.createElement('tbody');

    for (let user of items) {
      let tr = document.createElement('tr');

      for (let key in user) {
        let td = document.createElement('td');
        td.innerText = user[key];

        tr.append(td);
      }

      tbody.append(tr);
    }

    this.el.append(tbody);
  }

  this.clearData = () => {
    this.el.lastElementChild.remove();
  }

  /**
   * @property {Element} - обязательное свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');
  this.parseTitles();
  this.parseData();

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    if (column === 0) {
      items.sort((a, b) => {
        if (!desc && a.name > b.name || desc && a.name < b.name) {
          return 1;
        }

        if (a.name == b.name) {
          return 0;
        }

        if (!desc && a.name < b.name || desc && a.name > b.name) {
          return -1;
        }
      });
    }

    if (column === 2) {
      items.sort((a, b) => {
        if (!desc && a.salary > b.salary || desc && a.salary < b.salary) {
          return 1;
        }

        if (a.salary == b.salary) {
          return 0;
        }

        if (!desc && a.salary < b.salary || desc && a.salary > b.salary) {
          return -1;
        }
      });
    }

    this.clearData();
    this.parseData();
  };
}

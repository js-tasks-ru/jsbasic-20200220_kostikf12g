'use strict';

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>
    
      </ul>
    </li>
  
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>
    
       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>
    
      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    this.el = element;

    this.el.innerHTML = this.template;

    let listGroupItems = this.el.querySelectorAll('.list-group-item');


    for (let item of listGroupItems) {
      item.addEventListener('pointerenter', event => {
        item.querySelector('.dropdown-menu').classList.add('show');
        document.body.querySelector('.backdrop').classList.add('show');
      });

      item.addEventListener('pointerleave', event => {
        item.querySelector('.dropdown-menu').classList.remove('show');
        document.body.querySelector('.backdrop').classList.remove('show');
      });
    }

    this.el.addEventListener('click', e => {
      if (e.target.tagName === 'A') {

        let event = new CustomEvent('select', {bubbles: true, detail: {id: (e.target.id) ? e.target.id : e.target.innerText.toLowerCase()}});
        e.target.dispatchEvent(event);
      }
    });
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;
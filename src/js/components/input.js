//
// input.js
// -----------------------------------

import Uny from '../core/core';
import { escapeHTML } from '../utils';

class Input extends Uny {
  constructor() {
    super();

    this.events();
  }

  //
  // Click events
  //
  events() {
    [...this.elements.inputIsFile].forEach(element => {
      element.addEventListener('change', () => {
        this.showFileInfo(element);
      });
    });
  }

  //
  // Show selected file infomation
  //
  showFileInfo(element) {
    const fileName = element.getElementsByTagName('input')[0].files[0].name;

    if (element.getElementsByClassName('input-filename').length === 0) {
      element.insertAdjacentHTML('beforeend', escapeHTML`<div class="input-filename">${fileName}</div>`);
    } else {
      element.getElementsByClassName('input-filename')[0].textContent = fileName;
    }
  }
}

export default Input;

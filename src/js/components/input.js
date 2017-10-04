//
// input.js
// -----------------------------------

import Uny from '../core/core';

class Input extends Uny {
  constructor() {
    super();

    this.events();
  }

  //
  // Click events
  //
  events() {
    [...this.element.inputTypeFile].forEach(element => {
      element.addEventListener('change', () => this.showFileInfo(element));
    });
  }

  //
  // Show selected file infomation
  //
  showFileInfo(element) {
    const fileName = element.getElementsByTagName('input')[0].files[0].name;

    if (element.getElementsByClassName('input-filename').length === 0) {
      element.innerHTML += `<div class="input-filename">${fileName}</div>`;
    } else {
      element.getElementsByClassName('input-filename')[0].innerHTML = fileName;
    }
  }
}

export default Input;

//
// offcanvas.js
// -----------------------------------

import Uny from '../core/core';

class Offcanvas extends Uny {
  constructor() {
    super();

    this.events();
  }

  //
  // Click events
  //
  events() {
    [...this.element.offcanvasOpen].forEach(element => {
      element.addEventListener('click', this.open.bind(this));
    });

    [...this.element.offcanvasClose].forEach(element => {
      element.addEventListener('click', this.close.bind(this));
    });
  }

  //
  // Add `.is-active` to `.offcanvas` class.
  //
  open() {
    this.element.offcanvas[0].classList.add('is-active');
    this.element.body.style.overflow = 'hidden';
  }

  //
  // Remove `.is-active` from `.offcanvas` class.
  //
  close() {
    if (this.element.offcanvas[0].classList.contains('is-active')) {
      this.element.offcanvas[0].classList.remove('is-active');
      this.element.body.style.overflow = 'visible';
    }
  }
}

export default Offcanvas;

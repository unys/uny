//
// modal.js
// -----------------------------------

import Uny from '../core/core';

class Modal extends Uny {
  constructor() {
    super();

    this.state = {modal: {}};
    this.events();
  }

  //
  // Click events
  //
  events() {
    [...this.elements.modalOpen].forEach(element => {
      element.addEventListener('click', () => this.open(element));
    });

    [...this.elements.modalClose].forEach(element => {
      element.addEventListener('click', () => this.close(element));
    });
  }

  //
  // Add `.is-active` to `.modal` class.
  //
  open(element) {
    const targetId = element.getAttribute('data-target');
    const targetModal = this.elements.body.querySelector(targetId);

    this.state = {modal: targetId};

    targetModal.classList.add('is-active');
    this.elements.body.style.overflow = 'hidden';
  }

  //
  // Remove `.is-active` from `.modal` class.
  //
  close(element) {
    const currentModal = this.elements.body.querySelector(this.state.modal);

    if (currentModal.classList.contains('is-active')) {
      currentModal.classList.remove('is-active');
      this.elements.body.style.overflow = 'visible';
    }
  }
}

export default Modal;

//
// core.js
// -----------------------------------

import $$ from '../lib/querySelector';

class Uny {
  constructor() {

    //
    // Set nodeLists
    //
    this.element = {
      body:           document.body,
      offcanvas:      $$('.offcanvas'),
      offcanvasOpen:  $$('.offcanvas-open'),
      offcanvasClose: $$('.offcanvas-close'),
      tab:            $$('.tab'),
      tabList:        $$('.tab-list'),
      tabContent:     $$('.tab-content'),
      inputTypeFile:  $$('.input.is-file'),
    };
  }
}

export default Uny;

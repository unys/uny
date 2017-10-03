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
    };
  }
}

export default Uny;

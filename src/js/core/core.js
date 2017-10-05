//
// core.js
// -----------------------------------

class Uny {
  constructor() {

    //
    // Get trigger elements
    //
    this.elements = {
      body:           document.body,
      offcanvas:      document.getElementsByClassName('offcanvas'),
      offcanvasOpen:  document.getElementsByClassName('offcanvas-open'),
      offcanvasClose: document.getElementsByClassName('offcanvas-close'),
      tab:            document.getElementsByClassName('tab'),
      tabList:        document.getElementsByClassName('tab-list'),
      tabContent:     document.getElementsByClassName('tab-content'),
      inputIsFile:    document.getElementsByClassName('input is-file'),
    };
  }
}

export default Uny;

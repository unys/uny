//
// tab.js
// -----------------------------------

import Uny from '../core/core';

class Tab extends Uny {
  constructor() {
    super();

    this.events();
    this.setCurrentTab();
  }

  //
  // Click events
  //
  events() {
    [...this.elements.tabList].forEach((element, tabLength) => {
      for (let tabListLength = 0; tabListLength < element.children.length; tabListLength++) {
        element.children[tabListLength].addEventListener('click', (event) => {
          this.changeCurrentTab(event, tabLength, tabListLength);
        });
      }
    });
  }

  //
  // Set `.is-active` class to `.tab-content > *`
  //
  setCurrentTab() {
    [...this.elements.tabContent].forEach((element, tabIndex) => {
      element.children[this.getCurrentIndex(tabIndex)].classList.add('is-active');
    });
  }

  //
  // Get `.tab-list > *.is-current` index number.
  //
  getCurrentIndex(tabIndex) {
    for (let i = 0; i < this.elements.tabList[tabIndex].children.length; i++) {
      if ([...this.elements.tabList][tabIndex].children[i].classList.value === 'is-current') {
        return i;
      }
    }
  }

  //
  // Toggle `.is-current`, `.is-active` class.
  //
  changeCurrentTab(event, tabIndex, tabListIndex) {
    event.preventDefault();

    [...this.elements.tabList[tabIndex].children].forEach(element => {
      element.classList.remove('is-current');
    });

    [...this.elements.tabContent[tabIndex].children].forEach(element => {
      element.classList.remove('is-active');
    });

    this.elements.tabList[tabIndex].children[tabListIndex].classList.add('is-current');
    this.elements.tabContent[tabIndex].children[tabListIndex].classList.add('is-active');
  }
}

export default Tab;

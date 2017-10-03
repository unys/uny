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
    [...this.element.tabList].forEach((element, index) => {
      for (let i = 0; i < element.children.length; i++) {
        element.children[i].addEventListener('click', (event) => {
          this.changeCurrentTab(event, index, i);
        });
      }
    });
  }

  //
  // Toggle `.is-current`, `.is-active` class.
  //
  changeCurrentTab(event, tabIndex, clickTabListIndex) {
    event.preventDefault();

    this.changeTabListClass(tabIndex, clickTabListIndex);
    this.changeTabContentClass(tabIndex, clickTabListIndex);
  }

  changeTabListClass(tabIndex, clickTabListIndex) {
    [...this.element.tabList[tabIndex].children].forEach(element => {
      element.classList.remove('is-current');
    });

    this.element.tabList[tabIndex].children[clickTabListIndex].classList.add('is-current');
  }

  changeTabContentClass(tabIndex, clickTabListIndex) {
    [...this.element.tabContent[tabIndex].children].forEach(element => {
      element.classList.remove('is-active');
    });

    this.element.tabContent[tabIndex].children[clickTabListIndex].classList.add('is-active');
  }

  //
  // Set `.is-active` class to `.tab-content > *`
  //
  setCurrentTab() {
    [...this.element.tabContent].forEach((element, tabIndex) => {
      element.children[this.getCurrentIndex(tabIndex)].classList.add('is-active');
    });
  }

  //
  // Get `.tab-list > *.is-current` index number.
  //
  getCurrentIndex(tabIndex) {
    for (let i = 0; i < this.element.tabList[tabIndex].children.length; i++) {
      if ([...this.element.tabList][tabIndex].children[i].classList.value === 'is-current') {
        return i;
      }
    }
  }
}

export default Tab;

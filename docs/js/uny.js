/*! UNY CSS Framework | https://github.com/unys/uny | Copyright 2017 kokushin | MIT license */
(function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

//
// core.js
// -----------------------------------

var Uny = function Uny() {
  classCallCheck(this, Uny);


  //
  // Get trigger elements
  //
  this.elements = {
    body: document.body,
    offcanvas: document.getElementsByClassName('offcanvas'),
    offcanvasOpen: document.getElementsByClassName('offcanvas-open'),
    offcanvasClose: document.getElementsByClassName('offcanvas-close'),
    tab: document.getElementsByClassName('tab'),
    tabList: document.getElementsByClassName('tab-list'),
    tabContent: document.getElementsByClassName('tab-content'),
    inputIsFile: document.getElementsByClassName('input is-file')
  };
};

//
// offcanvas.js
// -----------------------------------

var Offcanvas = function (_Uny) {
  inherits(Offcanvas, _Uny);

  function Offcanvas() {
    classCallCheck(this, Offcanvas);

    var _this = possibleConstructorReturn(this, (Offcanvas.__proto__ || Object.getPrototypeOf(Offcanvas)).call(this));

    _this.events();
    return _this;
  }

  //
  // Click events
  //


  createClass(Offcanvas, [{
    key: 'events',
    value: function events() {
      var _this2 = this;

      [].concat(toConsumableArray(this.elements.offcanvasOpen)).forEach(function (element) {
        element.addEventListener('click', _this2.open.bind(_this2));
      });

      [].concat(toConsumableArray(this.elements.offcanvasClose)).forEach(function (element) {
        element.addEventListener('click', _this2.close.bind(_this2));
      });
    }

    //
    // Add `.is-active` to `.offcanvas` class.
    //

  }, {
    key: 'open',
    value: function open() {
      this.elements.offcanvas[0].classList.add('is-active');
      this.elements.body.style.overflow = 'hidden';
    }

    //
    // Remove `.is-active` from `.offcanvas` class.
    //

  }, {
    key: 'close',
    value: function close() {
      if (this.elements.offcanvas[0].classList.contains('is-active')) {
        this.elements.offcanvas[0].classList.remove('is-active');
        this.elements.body.style.overflow = 'visible';
      }
    }
  }]);
  return Offcanvas;
}(Uny);

//
// tab.js
// -----------------------------------

var Tab = function (_Uny) {
  inherits(Tab, _Uny);

  function Tab() {
    classCallCheck(this, Tab);

    var _this = possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this));

    _this.events();
    _this.setCurrentTab();
    return _this;
  }

  //
  // Click events
  //


  createClass(Tab, [{
    key: 'events',
    value: function events() {
      var _this2 = this;

      [].concat(toConsumableArray(this.elements.tabList)).forEach(function (element, tabLength) {
        var _loop = function _loop(tabListLength) {
          element.children[tabListLength].addEventListener('click', function (event) {
            _this2.changeCurrentTab(event, tabLength, tabListLength);
          });
        };

        for (var tabListLength = 0; tabListLength < element.children.length; tabListLength++) {
          _loop(tabListLength);
        }
      });
    }

    //
    // Set `.is-active` class to `.tab-content > *`
    //

  }, {
    key: 'setCurrentTab',
    value: function setCurrentTab() {
      var _this3 = this;

      [].concat(toConsumableArray(this.elements.tabContent)).forEach(function (element, tabIndex) {
        element.children[_this3.getCurrentIndex(tabIndex)].classList.add('is-active');
      });
    }

    //
    // Get `.tab-list > *.is-current` index number.
    //

  }, {
    key: 'getCurrentIndex',
    value: function getCurrentIndex(tabIndex) {
      for (var i = 0; i < this.elements.tabList[tabIndex].children.length; i++) {
        if ([].concat(toConsumableArray(this.elements.tabList))[tabIndex].children[i].classList.value === 'is-current') {
          return i;
        }
      }
    }

    //
    // Toggle `.is-current`, `.is-active` class.
    //

  }, {
    key: 'changeCurrentTab',
    value: function changeCurrentTab(event, tabIndex, tabListIndex) {
      event.preventDefault();

      [].concat(toConsumableArray(this.elements.tabList[tabIndex].children)).forEach(function (element) {
        element.classList.remove('is-current');
      });

      [].concat(toConsumableArray(this.elements.tabContent[tabIndex].children)).forEach(function (element) {
        element.classList.remove('is-active');
      });

      this.elements.tabList[tabIndex].children[tabListIndex].classList.add('is-current');
      this.elements.tabContent[tabIndex].children[tabListIndex].classList.add('is-active');
    }
  }]);
  return Tab;
}(Uny);

//
// input.js
// -----------------------------------

var Input = function (_Uny) {
  inherits(Input, _Uny);

  function Input() {
    classCallCheck(this, Input);

    var _this = possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.events();
    return _this;
  }

  //
  // Click events
  //


  createClass(Input, [{
    key: 'events',
    value: function events() {
      var _this2 = this;

      [].concat(toConsumableArray(this.elements.inputIsFile)).forEach(function (element) {
        element.addEventListener('change', function () {
          _this2.showFileInfo(element);
        });
      });
    }

    //
    // Show selected file infomation
    //

  }, {
    key: 'showFileInfo',
    value: function showFileInfo(element) {
      var fileName = element.getElementsByTagName('input')[0].files[0].name;

      if (element.getElementsByClassName('input-filename').length === 0) {
        element.innerHTML += '<div class="input-filename">' + fileName + '</div>';
      } else {
        element.getElementsByClassName('input-filename')[0].innerHTML = fileName;
      }
    }
  }]);
  return Input;
}(Uny);

//
// uny.js
// -----------------------------------

new Offcanvas();
new Tab();
new Input();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW55LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvY29yZS9jb3JlLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvb2ZmY2FudmFzLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvdGFiLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCIuLi8uLi9zcmMvanMvdW55LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBjb3JlLmpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBVbnkge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIC8vXG4gICAgLy8gR2V0IHRyaWdnZXIgZWxlbWVudHNcbiAgICAvL1xuICAgIHRoaXMuZWxlbWVudHMgPSB7XG4gICAgICBib2R5OiAgICAgICAgICAgZG9jdW1lbnQuYm9keSxcbiAgICAgIG9mZmNhbnZhczogICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvZmZjYW52YXMnKSxcbiAgICAgIG9mZmNhbnZhc09wZW46ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvZmZjYW52YXMtb3BlbicpLFxuICAgICAgb2ZmY2FudmFzQ2xvc2U6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29mZmNhbnZhcy1jbG9zZScpLFxuICAgICAgdGFiOiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYicpLFxuICAgICAgdGFiTGlzdDogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYi1saXN0JyksXG4gICAgICB0YWJDb250ZW50OiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFiLWNvbnRlbnQnKSxcbiAgICAgIGlucHV0SXNGaWxlOiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dCBpcy1maWxlJyksXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbnk7XG4iLCIvL1xuLy8gb2ZmY2FudmFzLmpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgVW55IGZyb20gJy4uL2NvcmUvY29yZSc7XG5cbmNsYXNzIE9mZmNhbnZhcyBleHRlbmRzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmV2ZW50cygpO1xuICB9XG5cbiAgLy9cbiAgLy8gQ2xpY2sgZXZlbnRzXG4gIC8vXG4gIGV2ZW50cygpIHtcbiAgICBbLi4udGhpcy5lbGVtZW50cy5vZmZjYW52YXNPcGVuXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3Blbi5iaW5kKHRoaXMpKTtcbiAgICB9KTtcblxuICAgIFsuLi50aGlzLmVsZW1lbnRzLm9mZmNhbnZhc0Nsb3NlXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBBZGQgYC5pcy1hY3RpdmVgIHRvIGAub2ZmY2FudmFzYCBjbGFzcy5cbiAgLy9cbiAgb3BlbigpIHtcbiAgICB0aGlzLmVsZW1lbnRzLm9mZmNhbnZhc1swXS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICB0aGlzLmVsZW1lbnRzLmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgfVxuXG4gIC8vXG4gIC8vIFJlbW92ZSBgLmlzLWFjdGl2ZWAgZnJvbSBgLm9mZmNhbnZhc2AgY2xhc3MuXG4gIC8vXG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLm9mZmNhbnZhc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLm9mZmNhbnZhc1swXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgIHRoaXMuZWxlbWVudHMuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2ZmY2FudmFzO1xuIiwiLy9cbi8vIHRhYi5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IFVueSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5jbGFzcyBUYWIgZXh0ZW5kcyBVbnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ldmVudHMoKTtcbiAgICB0aGlzLnNldEN1cnJlbnRUYWIoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMudGFiTGlzdF0uZm9yRWFjaCgoZWxlbWVudCwgdGFiTGVuZ3RoKSA9PiB7XG4gICAgICBmb3IgKGxldCB0YWJMaXN0TGVuZ3RoID0gMDsgdGFiTGlzdExlbmd0aCA8IGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyB0YWJMaXN0TGVuZ3RoKyspIHtcbiAgICAgICAgZWxlbWVudC5jaGlsZHJlblt0YWJMaXN0TGVuZ3RoXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlQ3VycmVudFRhYihldmVudCwgdGFiTGVuZ3RoLCB0YWJMaXN0TGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBTZXQgYC5pcy1hY3RpdmVgIGNsYXNzIHRvIGAudGFiLWNvbnRlbnQgPiAqYFxuICAvL1xuICBzZXRDdXJyZW50VGFiKCkge1xuICAgIFsuLi50aGlzLmVsZW1lbnRzLnRhYkNvbnRlbnRdLmZvckVhY2goKGVsZW1lbnQsIHRhYkluZGV4KSA9PiB7XG4gICAgICBlbGVtZW50LmNoaWxkcmVuW3RoaXMuZ2V0Q3VycmVudEluZGV4KHRhYkluZGV4KV0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBHZXQgYC50YWItbGlzdCA+ICouaXMtY3VycmVudGAgaW5kZXggbnVtYmVyLlxuICAvL1xuICBnZXRDdXJyZW50SW5kZXgodGFiSW5kZXgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMudGFiTGlzdFt0YWJJbmRleF0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChbLi4udGhpcy5lbGVtZW50cy50YWJMaXN0XVt0YWJJbmRleF0uY2hpbGRyZW5baV0uY2xhc3NMaXN0LnZhbHVlID09PSAnaXMtY3VycmVudCcpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gVG9nZ2xlIGAuaXMtY3VycmVudGAsIGAuaXMtYWN0aXZlYCBjbGFzcy5cbiAgLy9cbiAgY2hhbmdlQ3VycmVudFRhYihldmVudCwgdGFiSW5kZXgsIHRhYkxpc3RJbmRleCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy50YWJMaXN0W3RhYkluZGV4XS5jaGlsZHJlbl0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtY3VycmVudCcpO1xuICAgIH0pO1xuXG4gICAgWy4uLnRoaXMuZWxlbWVudHMudGFiQ29udGVudFt0YWJJbmRleF0uY2hpbGRyZW5dLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50cy50YWJMaXN0W3RhYkluZGV4XS5jaGlsZHJlblt0YWJMaXN0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2lzLWN1cnJlbnQnKTtcbiAgICB0aGlzLmVsZW1lbnRzLnRhYkNvbnRlbnRbdGFiSW5kZXhdLmNoaWxkcmVuW3RhYkxpc3RJbmRleF0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFiO1xuIiwiLy9cbi8vIGlucHV0LmpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgVW55IGZyb20gJy4uL2NvcmUvY29yZSc7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgVW55IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuZXZlbnRzKCk7XG4gIH1cblxuICAvL1xuICAvLyBDbGljayBldmVudHNcbiAgLy9cbiAgZXZlbnRzKCkge1xuICAgIFsuLi50aGlzLmVsZW1lbnRzLmlucHV0SXNGaWxlXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0ZpbGVJbmZvKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBTaG93IHNlbGVjdGVkIGZpbGUgaW5mb21hdGlvblxuICAvL1xuICBzaG93RmlsZUluZm8oZWxlbWVudCkge1xuICAgIGNvbnN0IGZpbGVOYW1lID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS5maWxlc1swXS5uYW1lO1xuXG4gICAgaWYgKGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQtZmlsZW5hbWUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiaW5wdXQtZmlsZW5hbWVcIj4ke2ZpbGVOYW1lfTwvZGl2PmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQtZmlsZW5hbWUnKVswXS5pbm5lckhUTUwgPSBmaWxlTmFtZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7XG4iLCIvL1xuLy8gdW55LmpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgT2ZmY2FudmFzIGZyb20gJy4vY29tcG9uZW50cy9vZmZjYW52YXMnO1xuaW1wb3J0IFRhYiBmcm9tICcuL2NvbXBvbmVudHMvdGFiJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQnO1xuXG5uZXcgT2ZmY2FudmFzKCk7XG5uZXcgVGFiKCk7XG5uZXcgSW5wdXQoKTtcbiJdLCJuYW1lcyI6WyJVbnkiLCJlbGVtZW50cyIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJPZmZjYW52YXMiLCJldmVudHMiLCJvZmZjYW52YXNPcGVuIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuIiwiYmluZCIsIm9mZmNhbnZhc0Nsb3NlIiwiY2xvc2UiLCJvZmZjYW52YXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsIm92ZXJmbG93IiwiY29udGFpbnMiLCJyZW1vdmUiLCJUYWIiLCJzZXRDdXJyZW50VGFiIiwidGFiTGlzdCIsImVsZW1lbnQiLCJ0YWJMZW5ndGgiLCJ0YWJMaXN0TGVuZ3RoIiwiY2hpbGRyZW4iLCJldmVudCIsImNoYW5nZUN1cnJlbnRUYWIiLCJsZW5ndGgiLCJ0YWJDb250ZW50IiwidGFiSW5kZXgiLCJnZXRDdXJyZW50SW5kZXgiLCJpIiwidmFsdWUiLCJ0YWJMaXN0SW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsIklucHV0IiwiaW5wdXRJc0ZpbGUiLCJzaG93RmlsZUluZm8iLCJmaWxlTmFtZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZmlsZXMiLCJuYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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

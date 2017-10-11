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
    modal: document.getElementsByClassName('modal'),
    modalOpen: document.getElementsByClassName('modal-open'),
    modalClose: document.getElementsByClassName('modal-close'),
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
// modal.js
// -----------------------------------

var Modal = function (_Uny) {
  inherits(Modal, _Uny);

  function Modal() {
    classCallCheck(this, Modal);

    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

    _this.state = { modal: {} };
    _this.events();
    return _this;
  }

  //
  // Click events
  //


  createClass(Modal, [{
    key: 'events',
    value: function events() {
      var _this2 = this;

      [].concat(toConsumableArray(this.elements.modalOpen)).forEach(function (element) {
        element.addEventListener('click', function () {
          return _this2.open(element);
        });
      });

      [].concat(toConsumableArray(this.elements.modalClose)).forEach(function (element) {
        element.addEventListener('click', function () {
          return _this2.close(element);
        });
      });
    }

    //
    // Add `.is-active` to `.modal` class.
    //

  }, {
    key: 'open',
    value: function open(element) {
      var targetId = element.getAttribute('data-target');
      var targetModal = this.elements.body.querySelector(targetId);

      this.state = { modal: targetId };

      targetModal.classList.add('is-active');
      this.elements.body.style.overflow = 'hidden';
    }

    //
    // Remove `.is-active` from `.modal` class.
    //

  }, {
    key: 'close',
    value: function close(element) {
      var currentModal = this.elements.body.querySelector(this.state.modal);

      if (currentModal.classList.contains('is-active')) {
        currentModal.classList.remove('is-active');
        this.elements.body.style.overflow = 'visible';
      }
    }
  }]);
  return Modal;
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
new Modal();
new Tab();
new Input();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW55LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvY29yZS9jb3JlLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvb2ZmY2FudmFzLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCIuLi8uLi9zcmMvanMvY29tcG9uZW50cy90YWIuanMiLCIuLi8uLi9zcmMvanMvY29tcG9uZW50cy9pbnB1dC5qcyIsIi4uLy4uL3NyYy9qcy91bnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIGNvcmUuanNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgLy9cbiAgICAvLyBHZXQgdHJpZ2dlciBlbGVtZW50c1xuICAgIC8vXG4gICAgdGhpcy5lbGVtZW50cyA9IHtcbiAgICAgIGJvZHk6ICAgICAgICAgICBkb2N1bWVudC5ib2R5LFxuICAgICAgb2ZmY2FudmFzOiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29mZmNhbnZhcycpLFxuICAgICAgb2ZmY2FudmFzT3BlbjogIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29mZmNhbnZhcy1vcGVuJyksXG4gICAgICBvZmZjYW52YXNDbG9zZTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb2ZmY2FudmFzLWNsb3NlJyksXG4gICAgICBtb2RhbDogICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwnKSxcbiAgICAgIG1vZGFsT3BlbjogICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1vcGVuJyksXG4gICAgICBtb2RhbENsb3NlOiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UnKSxcbiAgICAgIHRhYjogICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWInKSxcbiAgICAgIHRhYkxpc3Q6ICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWItbGlzdCcpLFxuICAgICAgdGFiQ29udGVudDogICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYi1jb250ZW50JyksXG4gICAgICBpbnB1dElzRmlsZTogICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQgaXMtZmlsZScpLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW55O1xuIiwiLy9cbi8vIG9mZmNhbnZhcy5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IFVueSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5jbGFzcyBPZmZjYW52YXMgZXh0ZW5kcyBVbnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMub2ZmY2FudmFzT3Blbl0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW4uYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy5vZmZjYW52YXNDbG9zZV0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gQWRkIGAuaXMtYWN0aXZlYCB0byBgLm9mZmNhbnZhc2AgY2xhc3MuXG4gIC8vXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5lbGVtZW50cy5vZmZjYW52YXNbMF0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgdGhpcy5lbGVtZW50cy5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cblxuICAvL1xuICAvLyBSZW1vdmUgYC5pcy1hY3RpdmVgIGZyb20gYC5vZmZjYW52YXNgIGNsYXNzLlxuICAvL1xuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5vZmZjYW52YXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSkge1xuICAgICAgdGhpcy5lbGVtZW50cy5vZmZjYW52YXNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICB0aGlzLmVsZW1lbnRzLmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9mZmNhbnZhcztcbiIsIi8vXG4vLyBtb2RhbC5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IFVueSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5jbGFzcyBNb2RhbCBleHRlbmRzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge21vZGFsOiB7fX07XG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMubW9kYWxPcGVuXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub3BlbihlbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy5tb2RhbENsb3NlXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoZWxlbWVudCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gQWRkIGAuaXMtYWN0aXZlYCB0byBgLm1vZGFsYCBjbGFzcy5cbiAgLy9cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0SWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgICBjb25zdCB0YXJnZXRNb2RhbCA9IHRoaXMuZWxlbWVudHMuYm9keS5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7bW9kYWw6IHRhcmdldElkfTtcblxuICAgIHRhcmdldE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgIHRoaXMuZWxlbWVudHMuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICB9XG5cbiAgLy9cbiAgLy8gUmVtb3ZlIGAuaXMtYWN0aXZlYCBmcm9tIGAubW9kYWxgIGNsYXNzLlxuICAvL1xuICBjbG9zZShlbGVtZW50KSB7XG4gICAgY29uc3QgY3VycmVudE1vZGFsID0gdGhpcy5lbGVtZW50cy5ib2R5LnF1ZXJ5U2VsZWN0b3IodGhpcy5zdGF0ZS5tb2RhbCk7XG5cbiAgICBpZiAoY3VycmVudE1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnaXMtYWN0aXZlJykpIHtcbiAgICAgIGN1cnJlbnRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgIHRoaXMuZWxlbWVudHMuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCIvL1xuLy8gdGFiLmpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgVW55IGZyb20gJy4uL2NvcmUvY29yZSc7XG5cbmNsYXNzIFRhYiBleHRlbmRzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmV2ZW50cygpO1xuICAgIHRoaXMuc2V0Q3VycmVudFRhYigpO1xuICB9XG5cbiAgLy9cbiAgLy8gQ2xpY2sgZXZlbnRzXG4gIC8vXG4gIGV2ZW50cygpIHtcbiAgICBbLi4udGhpcy5lbGVtZW50cy50YWJMaXN0XS5mb3JFYWNoKChlbGVtZW50LCB0YWJMZW5ndGgpID0+IHtcbiAgICAgIGZvciAobGV0IHRhYkxpc3RMZW5ndGggPSAwOyB0YWJMaXN0TGVuZ3RoIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IHRhYkxpc3RMZW5ndGgrKykge1xuICAgICAgICBlbGVtZW50LmNoaWxkcmVuW3RhYkxpc3RMZW5ndGhdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VDdXJyZW50VGFiKGV2ZW50LCB0YWJMZW5ndGgsIHRhYkxpc3RMZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIFNldCBgLmlzLWFjdGl2ZWAgY2xhc3MgdG8gYC50YWItY29udGVudCA+ICpgXG4gIC8vXG4gIHNldEN1cnJlbnRUYWIoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMudGFiQ29udGVudF0uZm9yRWFjaCgoZWxlbWVudCwgdGFiSW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuY2hpbGRyZW5bdGhpcy5nZXRDdXJyZW50SW5kZXgodGFiSW5kZXgpXS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIEdldCBgLnRhYi1saXN0ID4gKi5pcy1jdXJyZW50YCBpbmRleCBudW1iZXIuXG4gIC8vXG4gIGdldEN1cnJlbnRJbmRleCh0YWJJbmRleCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy50YWJMaXN0W3RhYkluZGV4XS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFsuLi50aGlzLmVsZW1lbnRzLnRhYkxpc3RdW3RhYkluZGV4XS5jaGlsZHJlbltpXS5jbGFzc0xpc3QudmFsdWUgPT09ICdpcy1jdXJyZW50Jykge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBUb2dnbGUgYC5pcy1jdXJyZW50YCwgYC5pcy1hY3RpdmVgIGNsYXNzLlxuICAvL1xuICBjaGFuZ2VDdXJyZW50VGFiKGV2ZW50LCB0YWJJbmRleCwgdGFiTGlzdEluZGV4KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIFsuLi50aGlzLmVsZW1lbnRzLnRhYkxpc3RbdGFiSW5kZXhdLmNoaWxkcmVuXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jdXJyZW50Jyk7XG4gICAgfSk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy50YWJDb250ZW50W3RhYkluZGV4XS5jaGlsZHJlbl0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRzLnRhYkxpc3RbdGFiSW5kZXhdLmNoaWxkcmVuW3RhYkxpc3RJbmRleF0uY2xhc3NMaXN0LmFkZCgnaXMtY3VycmVudCcpO1xuICAgIHRoaXMuZWxlbWVudHMudGFiQ29udGVudFt0YWJJbmRleF0uY2hpbGRyZW5bdGFiTGlzdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWI7XG4iLCIvL1xuLy8gaW5wdXQuanNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCBVbnkgZnJvbSAnLi4vY29yZS9jb3JlJztcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBVbnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMuaW5wdXRJc0ZpbGVdLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93RmlsZUluZm8oZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIFNob3cgc2VsZWN0ZWQgZmlsZSBpbmZvbWF0aW9uXG4gIC8vXG4gIHNob3dGaWxlSW5mbyhlbGVtZW50KSB7XG4gICAgY29uc3QgZmlsZU5hbWUgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLmZpbGVzWzBdLm5hbWU7XG5cbiAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dC1maWxlbmFtZScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJpbnB1dC1maWxlbmFtZVwiPiR7ZmlsZU5hbWV9PC9kaXY+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dC1maWxlbmFtZScpWzBdLmlubmVySFRNTCA9IGZpbGVOYW1lO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcbiIsIi8vXG4vLyB1bnkuanNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCBPZmZjYW52YXMgZnJvbSAnLi9jb21wb25lbnRzL29mZmNhbnZhcyc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcbmltcG9ydCBUYWIgZnJvbSAnLi9jb21wb25lbnRzL3RhYic7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9jb21wb25lbnRzL2lucHV0JztcblxubmV3IE9mZmNhbnZhcygpO1xubmV3IE1vZGFsKCk7XG5uZXcgVGFiKCk7XG5uZXcgSW5wdXQoKTtcbiJdLCJuYW1lcyI6WyJVbnkiLCJlbGVtZW50cyIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJPZmZjYW52YXMiLCJldmVudHMiLCJvZmZjYW52YXNPcGVuIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuIiwiYmluZCIsIm9mZmNhbnZhc0Nsb3NlIiwiY2xvc2UiLCJvZmZjYW52YXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsIm92ZXJmbG93IiwiY29udGFpbnMiLCJyZW1vdmUiLCJNb2RhbCIsInN0YXRlIiwibW9kYWwiLCJtb2RhbE9wZW4iLCJlbGVtZW50IiwibW9kYWxDbG9zZSIsInRhcmdldElkIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0TW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwiY3VycmVudE1vZGFsIiwiVGFiIiwic2V0Q3VycmVudFRhYiIsInRhYkxpc3QiLCJ0YWJMZW5ndGgiLCJ0YWJMaXN0TGVuZ3RoIiwiY2hpbGRyZW4iLCJldmVudCIsImNoYW5nZUN1cnJlbnRUYWIiLCJsZW5ndGgiLCJ0YWJDb250ZW50IiwidGFiSW5kZXgiLCJnZXRDdXJyZW50SW5kZXgiLCJpIiwidmFsdWUiLCJ0YWJMaXN0SW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsIklucHV0IiwiaW5wdXRJc0ZpbGUiLCJzaG93RmlsZUluZm8iLCJmaWxlTmFtZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZmlsZXMiLCJuYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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

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









var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
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
// utils.js
// -----------------------------------

/**
 * HTMLの特殊文字をエスケープするタグ付きテンプレート関数
 * @param {TemplateStringsArray} strings 
 * @param {any[]}                values 
 * @return {string}
 * @example
 * ```js
 * const unsafe = '<script>alert("xss")</script>'
 * console.log(escapeHTML`<div>${ unsafe }</div>`) // => '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>'
 * ```
 */
var escapeHTML = function escapeHTML(strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return strings.reduce(function (memo, string, i) {
    return memo + escape(values[i - 1]) + string;
  });
};

/**
 * HTMLに挿入される文字列をエスケープする
 * @param {string} value 
 * @return {string}
 * @example
 * ```js
 * escape('<a onmouseenter="alert(\'xss\')">') // => &lt;a onmouseenter=&quot;alert(&#039;xss&#039;)&quot;&gt;
 * ```
 */
var escape = function escape(value) {
  if (value == null) {
    return '';
  }

  return String(value).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/`/g, '&#096;');
};

var _templateObject = taggedTemplateLiteral(['<div class="input-filename">', '</div>'], ['<div class="input-filename">', '</div>']);

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
        element.insertAdjacentHTML('beforeend', escapeHTML(_templateObject, fileName));
      } else {
        element.getElementsByClassName('input-filename')[0].textContent = fileName;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW55LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvY29yZS9jb3JlLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvb2ZmY2FudmFzLmpzIiwiLi4vLi4vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCIuLi8uLi9zcmMvanMvY29tcG9uZW50cy90YWIuanMiLCIuLi8uLi9zcmMvanMvdXRpbHMvaW5kZXguanMiLCIuLi8uLi9zcmMvanMvY29tcG9uZW50cy9pbnB1dC5qcyIsIi4uLy4uL3NyYy9qcy91bnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIGNvcmUuanNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgLy9cbiAgICAvLyBHZXQgdHJpZ2dlciBlbGVtZW50c1xuICAgIC8vXG4gICAgdGhpcy5lbGVtZW50cyA9IHtcbiAgICAgIGJvZHk6ICAgICAgICAgICBkb2N1bWVudC5ib2R5LFxuICAgICAgb2ZmY2FudmFzOiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29mZmNhbnZhcycpLFxuICAgICAgb2ZmY2FudmFzT3BlbjogIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29mZmNhbnZhcy1vcGVuJyksXG4gICAgICBvZmZjYW52YXNDbG9zZTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb2ZmY2FudmFzLWNsb3NlJyksXG4gICAgICBtb2RhbDogICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwnKSxcbiAgICAgIG1vZGFsT3BlbjogICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1vcGVuJyksXG4gICAgICBtb2RhbENsb3NlOiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UnKSxcbiAgICAgIHRhYjogICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWInKSxcbiAgICAgIHRhYkxpc3Q6ICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWItbGlzdCcpLFxuICAgICAgdGFiQ29udGVudDogICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYi1jb250ZW50JyksXG4gICAgICBpbnB1dElzRmlsZTogICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQgaXMtZmlsZScpLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW55O1xuIiwiLy9cbi8vIG9mZmNhbnZhcy5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IFVueSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5jbGFzcyBPZmZjYW52YXMgZXh0ZW5kcyBVbnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMub2ZmY2FudmFzT3Blbl0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW4uYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy5vZmZjYW52YXNDbG9zZV0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gQWRkIGAuaXMtYWN0aXZlYCB0byBgLm9mZmNhbnZhc2AgY2xhc3MuXG4gIC8vXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5lbGVtZW50cy5vZmZjYW52YXNbMF0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgdGhpcy5lbGVtZW50cy5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cblxuICAvL1xuICAvLyBSZW1vdmUgYC5pcy1hY3RpdmVgIGZyb20gYC5vZmZjYW52YXNgIGNsYXNzLlxuICAvL1xuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5vZmZjYW52YXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSkge1xuICAgICAgdGhpcy5lbGVtZW50cy5vZmZjYW52YXNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICB0aGlzLmVsZW1lbnRzLmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9mZmNhbnZhcztcbiIsIi8vXG4vLyBtb2RhbC5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IFVueSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5jbGFzcyBNb2RhbCBleHRlbmRzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge21vZGFsOiB7fX07XG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMubW9kYWxPcGVuXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub3BlbihlbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy5tb2RhbENsb3NlXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoZWxlbWVudCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gQWRkIGAuaXMtYWN0aXZlYCB0byBgLm1vZGFsYCBjbGFzcy5cbiAgLy9cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0SWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgICBjb25zdCB0YXJnZXRNb2RhbCA9IHRoaXMuZWxlbWVudHMuYm9keS5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7bW9kYWw6IHRhcmdldElkfTtcblxuICAgIHRhcmdldE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgIHRoaXMuZWxlbWVudHMuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICB9XG5cbiAgLy9cbiAgLy8gUmVtb3ZlIGAuaXMtYWN0aXZlYCBmcm9tIGAubW9kYWxgIGNsYXNzLlxuICAvL1xuICBjbG9zZShlbGVtZW50KSB7XG4gICAgY29uc3QgY3VycmVudE1vZGFsID0gdGhpcy5lbGVtZW50cy5ib2R5LnF1ZXJ5U2VsZWN0b3IodGhpcy5zdGF0ZS5tb2RhbCk7XG5cbiAgICBpZiAoY3VycmVudE1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnaXMtYWN0aXZlJykpIHtcbiAgICAgIGN1cnJlbnRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgIHRoaXMuZWxlbWVudHMuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCIvL1xuLy8gdGFiLmpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgVW55IGZyb20gJy4uL2NvcmUvY29yZSc7XG5cbmNsYXNzIFRhYiBleHRlbmRzIFVueSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmV2ZW50cygpO1xuICAgIHRoaXMuc2V0Q3VycmVudFRhYigpO1xuICB9XG5cbiAgLy9cbiAgLy8gQ2xpY2sgZXZlbnRzXG4gIC8vXG4gIGV2ZW50cygpIHtcbiAgICBbLi4udGhpcy5lbGVtZW50cy50YWJMaXN0XS5mb3JFYWNoKChlbGVtZW50LCB0YWJMZW5ndGgpID0+IHtcbiAgICAgIGZvciAobGV0IHRhYkxpc3RMZW5ndGggPSAwOyB0YWJMaXN0TGVuZ3RoIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IHRhYkxpc3RMZW5ndGgrKykge1xuICAgICAgICBlbGVtZW50LmNoaWxkcmVuW3RhYkxpc3RMZW5ndGhdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VDdXJyZW50VGFiKGV2ZW50LCB0YWJMZW5ndGgsIHRhYkxpc3RMZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIFNldCBgLmlzLWFjdGl2ZWAgY2xhc3MgdG8gYC50YWItY29udGVudCA+ICpgXG4gIC8vXG4gIHNldEN1cnJlbnRUYWIoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMudGFiQ29udGVudF0uZm9yRWFjaCgoZWxlbWVudCwgdGFiSW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuY2hpbGRyZW5bdGhpcy5nZXRDdXJyZW50SW5kZXgodGFiSW5kZXgpXS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIEdldCBgLnRhYi1saXN0ID4gKi5pcy1jdXJyZW50YCBpbmRleCBudW1iZXIuXG4gIC8vXG4gIGdldEN1cnJlbnRJbmRleCh0YWJJbmRleCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy50YWJMaXN0W3RhYkluZGV4XS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFsuLi50aGlzLmVsZW1lbnRzLnRhYkxpc3RdW3RhYkluZGV4XS5jaGlsZHJlbltpXS5jbGFzc0xpc3QudmFsdWUgPT09ICdpcy1jdXJyZW50Jykge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBUb2dnbGUgYC5pcy1jdXJyZW50YCwgYC5pcy1hY3RpdmVgIGNsYXNzLlxuICAvL1xuICBjaGFuZ2VDdXJyZW50VGFiKGV2ZW50LCB0YWJJbmRleCwgdGFiTGlzdEluZGV4KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIFsuLi50aGlzLmVsZW1lbnRzLnRhYkxpc3RbdGFiSW5kZXhdLmNoaWxkcmVuXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jdXJyZW50Jyk7XG4gICAgfSk7XG5cbiAgICBbLi4udGhpcy5lbGVtZW50cy50YWJDb250ZW50W3RhYkluZGV4XS5jaGlsZHJlbl0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRzLnRhYkxpc3RbdGFiSW5kZXhdLmNoaWxkcmVuW3RhYkxpc3RJbmRleF0uY2xhc3NMaXN0LmFkZCgnaXMtY3VycmVudCcpO1xuICAgIHRoaXMuZWxlbWVudHMudGFiQ29udGVudFt0YWJJbmRleF0uY2hpbGRyZW5bdGFiTGlzdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWI7XG4iLCIvL1xuLy8gdXRpbHMuanNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogSFRNTOOBrueJueauiuaWh+Wtl+OCkuOCqOOCueOCseODvOODl+OBmeOCi+OCv+OCsOS7mOOBjeODhuODs+ODl+ODrOODvOODiOmWouaVsFxuICogQHBhcmFtIHtUZW1wbGF0ZVN0cmluZ3NBcnJheX0gc3RyaW5ncyBcbiAqIEBwYXJhbSB7YW55W119ICAgICAgICAgICAgICAgIHZhbHVlcyBcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogY29uc3QgdW5zYWZlID0gJzxzY3JpcHQ+YWxlcnQoXCJ4c3NcIik8L3NjcmlwdD4nXG4gKiBjb25zb2xlLmxvZyhlc2NhcGVIVE1MYDxkaXY+JHsgdW5zYWZlIH08L2Rpdj5gKSAvLyA9PiAnPGRpdj4mbHQ7c2NyaXB0Jmd0O2FsZXJ0KCZxdW90O3hzcyZxdW90OykmbHQ7L3NjcmlwdCZndDs8L2Rpdj4nXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IGVzY2FwZUhUTUwgPSAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiBzdHJpbmdzLnJlZHVjZSgobWVtbywgc3RyaW5nLCBpKSA9PiBtZW1vICsgZXNjYXBlKHZhbHVlc1tpIC0gMV0pICsgc3RyaW5nKTtcblxuLyoqXG4gKiBIVE1M44Gr5oy/5YWl44GV44KM44KL5paH5a2X5YiX44KS44Ko44K544Kx44O844OX44GZ44KLXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGVzY2FwZSgnPGEgb25tb3VzZWVudGVyPVwiYWxlcnQoXFwneHNzXFwnKVwiPicpIC8vID0+ICZsdDthIG9ubW91c2VlbnRlcj0mcXVvdDthbGVydCgmIzAzOTt4c3MmIzAzOTspJnF1b3Q7Jmd0O1xuICogYGBgXG4gKi9cbmNvbnN0IGVzY2FwZSA9IHZhbHVlID0+IHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLycvZywgJyYjMDM5OycpXG4gICAgLnJlcGxhY2UoL2AvZywgJyYjMDk2OycpO1xufTtcbiIsIi8vXG4vLyBpbnB1dC5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IFVueSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuaW1wb3J0IHsgZXNjYXBlSFRNTCB9IGZyb20gJy4uL3V0aWxzJztcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBVbnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIENsaWNrIGV2ZW50c1xuICAvL1xuICBldmVudHMoKSB7XG4gICAgWy4uLnRoaXMuZWxlbWVudHMuaW5wdXRJc0ZpbGVdLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93RmlsZUluZm8oZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIFNob3cgc2VsZWN0ZWQgZmlsZSBpbmZvbWF0aW9uXG4gIC8vXG4gIHNob3dGaWxlSW5mbyhlbGVtZW50KSB7XG4gICAgY29uc3QgZmlsZU5hbWUgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLmZpbGVzWzBdLm5hbWU7XG5cbiAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dC1maWxlbmFtZScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGVzY2FwZUhUTUxgPGRpdiBjbGFzcz1cImlucHV0LWZpbGVuYW1lXCI+JHtmaWxlTmFtZX08L2Rpdj5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dC1maWxlbmFtZScpWzBdLnRleHRDb250ZW50ID0gZmlsZU5hbWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiLy9cbi8vIHVueS5qc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IE9mZmNhbnZhcyBmcm9tICcuL2NvbXBvbmVudHMvb2ZmY2FudmFzJztcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xuaW1wb3J0IFRhYiBmcm9tICcuL2NvbXBvbmVudHMvdGFiJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQnO1xuXG5uZXcgT2ZmY2FudmFzKCk7XG5uZXcgTW9kYWwoKTtcbm5ldyBUYWIoKTtcbm5ldyBJbnB1dCgpO1xuIl0sIm5hbWVzIjpbIlVueSIsImVsZW1lbnRzIiwiZG9jdW1lbnQiLCJib2R5IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIk9mZmNhbnZhcyIsImV2ZW50cyIsIm9mZmNhbnZhc09wZW4iLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9wZW4iLCJiaW5kIiwib2ZmY2FudmFzQ2xvc2UiLCJjbG9zZSIsIm9mZmNhbnZhcyIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwib3ZlcmZsb3ciLCJjb250YWlucyIsInJlbW92ZSIsIk1vZGFsIiwic3RhdGUiLCJtb2RhbCIsIm1vZGFsT3BlbiIsImVsZW1lbnQiLCJtb2RhbENsb3NlIiwidGFyZ2V0SWQiLCJnZXRBdHRyaWJ1dGUiLCJ0YXJnZXRNb2RhbCIsInF1ZXJ5U2VsZWN0b3IiLCJjdXJyZW50TW9kYWwiLCJUYWIiLCJzZXRDdXJyZW50VGFiIiwidGFiTGlzdCIsInRhYkxlbmd0aCIsInRhYkxpc3RMZW5ndGgiLCJjaGlsZHJlbiIsImV2ZW50IiwiY2hhbmdlQ3VycmVudFRhYiIsImxlbmd0aCIsInRhYkNvbnRlbnQiLCJ0YWJJbmRleCIsImdldEN1cnJlbnRJbmRleCIsImkiLCJ2YWx1ZSIsInRhYkxpc3RJbmRleCIsInByZXZlbnREZWZhdWx0IiwiZXNjYXBlSFRNTCIsInN0cmluZ3MiLCJ2YWx1ZXMiLCJyZWR1Y2UiLCJtZW1vIiwic3RyaW5nIiwiZXNjYXBlIiwiU3RyaW5nIiwicmVwbGFjZSIsIklucHV0IiwiaW5wdXRJc0ZpbGUiLCJzaG93RmlsZUluZm8iLCJmaWxlTmFtZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZmlsZXMiLCJuYW1lIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGV4dENvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsTUFDSixlQUFjOzs7Ozs7O09BS1BDLFFBQUwsR0FBZ0I7VUFDRUMsU0FBU0MsSUFEWDtlQUVFRCxTQUFTRSxzQkFBVCxDQUFnQyxXQUFoQyxDQUZGO21CQUdFRixTQUFTRSxzQkFBVCxDQUFnQyxnQkFBaEMsQ0FIRjtvQkFJRUYsU0FBU0Usc0JBQVQsQ0FBZ0MsaUJBQWhDLENBSkY7V0FLRUYsU0FBU0Usc0JBQVQsQ0FBZ0MsT0FBaEMsQ0FMRjtlQU1FRixTQUFTRSxzQkFBVCxDQUFnQyxZQUFoQyxDQU5GO2dCQU9FRixTQUFTRSxzQkFBVCxDQUFnQyxhQUFoQyxDQVBGO1NBUUVGLFNBQVNFLHNCQUFULENBQWdDLEtBQWhDLENBUkY7YUFTRUYsU0FBU0Usc0JBQVQsQ0FBZ0MsVUFBaEMsQ0FURjtnQkFVRUYsU0FBU0Usc0JBQVQsQ0FBZ0MsYUFBaEMsQ0FWRjtpQkFX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

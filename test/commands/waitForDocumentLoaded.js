

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _events = require('events');

const _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`); } subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass, enumerable: false, writable: true, configurable: true,
    },
  }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * This custom command allows us to wait until the page is fully loaded. It checks document.readyState
 * every 100ms until its value is "complete" or the timeout is reached.
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForDocumentLoaded();
 *     browser.waitForDocumentLoaded(5000, 'Document fully loaded!');
 *
 * @author rober710
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [message] - message to display
 */

const WaitForDocumentLoaded = (function (_events$EventEmitter) {
  _inherits(WaitForDocumentLoaded, _events$EventEmitter);

  function WaitForDocumentLoaded() {
    _classCallCheck(this, WaitForDocumentLoaded);

    const _this = _possibleConstructorReturn(this, (WaitForDocumentLoaded.__proto__ || Object.getPrototypeOf(WaitForDocumentLoaded)).call(this));

    _this.timeoutRetryInMilliseconds = _this.api.globals.waitForConditionPollInterval || 100;
    _this.defaultTimeoutInMilliseconds = _this.api.globals.waitForConditionTimeout || 5000;
    _this.startTimeInMilliseconds = null;
    return _this;
  }

  _createClass(WaitForDocumentLoaded, [{
    key: 'command',
    value: function command(timeoutInMilliseconds, message) {
      const _this2 = this;

      this.startTimeInMilliseconds = new Date().getTime();

      if (typeof timeoutInMilliseconds !== 'number') {
        timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
      }

      if (message && typeof message !== 'string') {
        this.emit('error', 'defaultMessage is not a string');
        return;
      }

      this.check((pageLoaded, loadedTimeInMilliseconds, readyState) => {
        let messageToShow = void 0;
        if (message) {
          messageToShow = message;
        } else if (pageLoaded) {
          messageToShow = `waitForDocumentLoaded: document fully loaded after ${loadedTimeInMilliseconds - _this2.startTimeInMilliseconds} ms.`;
        } else {
          messageToShow = `waitForDocumentLoaded: document not loaded after ${timeoutInMilliseconds} ms.`;
        }

        _this2.client.assertion(pageLoaded, readyState, 'complete', messageToShow, true);
        return _this2.emit('complete');
      }, timeoutInMilliseconds);
    },
  }, {
    key: 'check',
    value: function check(callback, maxTimeInMilliseconds) {
      const _this3 = this;

      return this.api.execute(() => document.readyState, [], (result) => {
        const now = new Date().getTime();
        if (result.status === 0 && result.value === 'complete') {
          return callback(true, now, result.value);
        } if (now - _this3.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(() => {
            _this3.check(callback, maxTimeInMilliseconds);
          }, _this3.timeoutRetryInMilliseconds);
        }
        return callback(false, now, result.value);
      });
    },
  }]);

  return WaitForDocumentLoaded;
}(_events2.default.EventEmitter));

exports.default = WaitForDocumentLoaded;
module.exports = exports.default;

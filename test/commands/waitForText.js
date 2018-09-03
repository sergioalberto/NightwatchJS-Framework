

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
 * This custom command allows us to locate an HTML element on the page and then wait until the value of the element's
 * inner text (the text between the opening and closing tags) matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForText("div", function(text) {
 *         return text === "something";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {Function} checker - function that must return true if the element's text matches your requisite, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

const WaitForText = (function (_events$EventEmitter) {
  _inherits(WaitForText, _events$EventEmitter);

  function WaitForText() {
    _classCallCheck(this, WaitForText);

    const _this = _possibleConstructorReturn(this, (WaitForText.__proto__ || Object.getPrototypeOf(WaitForText)).call(this));

    _this.timeoutRetryInMilliseconds = _this.api.globals.waitForConditionPollInterval || 100;
    _this.defaultTimeoutInMilliseconds = _this.api.globals.waitForConditionTimeout || 5000;
    _this.locateStrategy = 'css';
    _this.startTimeInMilliseconds = null;
    return _this;
  }

  _createClass(WaitForText, [{
    key: 'restoreLocateStrategy',
    value: function restoreLocateStrategy() {
      if (this.locateStrategy === 'xpath') {
        this.api.useXpath();
      }
      if (this.locateStrategy === 'css') {
        return this.api.useCss();
      }
    },
  }, {
    key: 'command',
    value: function command(elementSelector, checker, timeoutInMilliseconds, defaultMessage) {
      const _this2 = this;

      // Save the origian locate strategy, because if this command is used with
      // page objects, the "checker" function of this command is wrapped with another
      // function which resets the locate strategy after the function is called,
      // but since the function is called many times, from the second one the locateStrategy
      // is wrong
      this.locateStrategy = this.client.locateStrategy;

      this.startTimeInMilliseconds = new Date().getTime();

      if (typeof timeoutInMilliseconds !== 'number') {
        timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
      }
      if (defaultMessage && typeof defaultMessage !== 'string') {
        this.emit('error', 'defaultMessage is not a string');
        return;
      }

      this.check(elementSelector, checker, (result, loadedTimeInMilliseconds) => {
        let message = '';
        if (defaultMessage) {
          message = defaultMessage;
        } else if (result) {
          message = `waitForText: ${elementSelector}. Expression was true after ${loadedTimeInMilliseconds - _this2.startTimeInMilliseconds} ms.`;
        } else {
          message = `waitForText: ${elementSelector}. Expression wasn't true in ${timeoutInMilliseconds} ms.`;
        }

        _this2.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this2.emit('complete');
      }, timeoutInMilliseconds);

      return this;
    },
  }, {
    key: 'check',
    value: function check(elementSelector, checker, callback, maxTimeInMilliseconds) {
      const _this3 = this;

      // Restore the origian locate strategy
      this.restoreLocateStrategy();

      return this.api.getText(elementSelector, (result) => {
        const now = new Date().getTime();
        if (result.status === 0 && checker(result.value)) {
          return callback(true, now);
        } if (now - _this3.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(() => _this3.check(elementSelector, checker, callback, maxTimeInMilliseconds), _this3.timeoutRetryInMilliseconds);
        }
        return callback(false);
      });
    },
  }]);

  return WaitForText;
}(_events2.default.EventEmitter));

exports.default = WaitForText;
module.exports = exports.default;

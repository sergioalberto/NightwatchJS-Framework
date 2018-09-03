

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.assertion = assertion;

const _util = require('util');

const _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Assert that the element identified by the jquery selector exists in the DOM.
 * ***Requires jqueryElement command***
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.jqueryElementPresent("div:eq(2)")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector
 * @param {String} [msg] - output to identify the assertion
 */
function assertion(selector, msg) {
  this.message = msg || _util2.default.format('Testing if element <%s> is present.', selector);
  this.expected = 'present';

  this.pass = function (value) {
    return !!value;
  };

  this.value = function (result) {
    let value = null;
    if (result) {
      value = !!result;
    }
    return value;
  };

  this.command = function (callback) {
    return this.api.jqueryElement(selector, callback);
  };
}

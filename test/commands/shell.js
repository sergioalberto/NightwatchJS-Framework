

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _events = require('events');

const _events2 = _interopRequireDefault(_events);

const _child_process = require('child_process');

const _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`); } subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass, enumerable: false, writable: true, configurable: true,
    },
  }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
  * Execute a command on the shell
  *
  * h3 Examples:
  *
  *     browser.shell("mysql -u root database_name < fakedata.sql")
  *
  * @author maxgalbu
  * @param {String} command to execute on the shell
 */
const ShellAction = (function (_events$EventEmitter) {
  _inherits(ShellAction, _events$EventEmitter);

  function ShellAction() {
    _classCallCheck(this, ShellAction);

    return _possibleConstructorReturn(this, (ShellAction.__proto__ || Object.getPrototypeOf(ShellAction)).apply(this, arguments));
  }

  _createClass(ShellAction, [{
    key: 'command',
    value: function command(_command, callback) {
      const _this2 = this;

      const windows = /^win/.test(process.platform);

      _child_process2.default.exec(`${_command} 2>&1`, null, (err, stdout, stderr) => {
        console.log(`Done ${_command}:\n${stdout}`);

        if (typeof callback === 'function') {
          callback.call(_this2, err, stdout, stderr);
        }

        return _this2.emit('complete');
      });

      return this;
    },
  }]);

  return ShellAction;
}(_events2.default.EventEmitter));

exports.default = ShellAction;
module.exports = exports.default;

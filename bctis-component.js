'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { AccountData, ContractData, ContractForm } from 'drizzle-react-components';

var BctisComponent = function (_React$Component) {
  _inherits(BctisComponent, _React$Component);

  function BctisComponent(props) {
    _classCallCheck(this, BctisComponent);

    return _possibleConstructorReturn(this, (BctisComponent.__proto__ || Object.getPrototypeOf(BctisComponent)).call(this, props));
  }

  return BctisComponent;
}(React.Component);
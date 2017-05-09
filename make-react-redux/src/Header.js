import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './react-redux';

// 传入的组件参数
class Header extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  render () {
    return (
      // props来自包裹的属性
      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
    )
  }
}

// 传入的参数-----函数名，获取所需的数据
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
};

Header = connect(mapStateToProps)(Header);

export default Header;
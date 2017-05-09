import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Provider extends Component {

  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  };

  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }

}

// 接受一个mapStateToProps，与组件，返回一个高阶组件
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  // 返回一个高阶组件
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    // 最开始，设置state中allProps为一个空对象
    constructor () {
      super();
      this.state = { allProps: {} };
    }

    // 组件熏染之前，获取最初的store
    componentWillMount () {
     const { store } = this.context;
     this._updateProps();
     // 订阅更新属性
     store.subscribe(() => this._updateProps())
   }

   _updateProps () {
     const { store } = this.context;
     // 最初的state, 组件的this.props
     let stateProps = mapStateToProps
         ? mapStateToProps(store.getState(), this.props)
         : { }; // 防止mapStateToProps没有传入
     let dispatchProps = mapDispatchToProps 
         ? mapDispatchToProps(store.dispatch, this.props)
         : {}; // 防止 mapDispatchToProps 没有传入
     this.setState({
       allProps: { // 整合普通的 props 和从 state 生成的 props
         ...stateProps,
         ...dispatchProps,
         ...this.props
       }
     })
   }

    render () {
      // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  // 这个高阶组件的有最初state的属性的props的组件
  return Connect;
}

/*
这个connect的函数，就是一个典型的闭包
注意，箭头函数的this====是定义这个函数的对象，不是运行时的对象
let connect = function (mapStateToProps) {
  function (WrappedComponent) {
    一个类
    class Connect {
  
    }
    return Connct -----返回这个类
  }
}

 */
 
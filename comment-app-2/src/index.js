import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Content from './Content';
import { Provider } from './react-redux';

import './index.css';



ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)

import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Todo from './components/Todo';
import configureStore from './Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Todo />
      </Provider>
    );
  }
}

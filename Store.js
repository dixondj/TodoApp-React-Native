import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from './ducks/index';

const rootReducer = combineReducers(reducers);

export default function configureStore() {
  return createStore(rootReducer);
}

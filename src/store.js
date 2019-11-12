import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

const reduxStore = applyMiddleware(...middleware);

const store = createStore(rootReducer, initialState, reduxStore);

export default store;

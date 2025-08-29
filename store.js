// store.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
const createSagaMiddleware = require('redux-saga').default;
import rootReducer from './src/reducers';
import rootSaga from './src/reducers/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;

import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) // !esta linea sive para que podamos hacer peticiones a una api
  )
export default store;
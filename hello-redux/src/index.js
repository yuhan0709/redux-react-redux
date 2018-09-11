import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducer from './reducers/counter';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import {increment,decrement} from './actions'
const store = createStore(reducer);
const render = () => {
    ReactDOM.render(
      <App
        onIncrement={ () => store.dispatch(increment()) }
        onDecrement={ () => store.dispatch(decrement()) }
        value={ store.getState() }
      />, document.getElementById('root'));
  };
  
  render();
  
  store.subscribe(render);
registerServiceWorker();
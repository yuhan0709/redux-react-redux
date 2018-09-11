import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/index';
import promise from 'redux-promise-middleware';

//中间件
const logger = store=>next=>action=>{
    //三个箭头函数的嵌套
    console.log("dispatching",action);
    let result = next(action);
    console.log('next store',store.getState());
    return result;
}

//处理错误的中间件
const error = store=>next=>action=>{
    try{
        next(action)
    }catch(e){
        console.log("error:"+e);
    }
}
//这里的thunk中间件的意思是将action为函数 转化为 为对像
const store = createStore(rootReducer,{},applyMiddleware(logger,error,thunk,promise()));

ReactDOM.render(
    <Provider store={ store }>
        <App/>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();

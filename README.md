# 说明
1. 这个demo分为两部分，分别是redux、react-redux的应用demo
2. 这份文档分为两部分，一部分是对Redux相关知识的笔记，另一部分是对这些知识demo的讲解
3. demo已上传至仓库。
# redux
## 核心概念
rudux类似vuex,主要作用就是一个状态管理。
### store
Store是保存数据的地方，可以把它看成一个容器
### action
action可以更新state中的数据，action就是描述state发生什么变化的指示器。是一个对象。类似
```
{type:'ADD_TODO', text:'Go to swimming pool'}
```
### reducer
为了把action和state串起来，开发了一些函数，这就是reducer。
```
const counter = function(state=0,action={}){
    switch(action.type){
        case 'INCREMENT':
            return state+1
        case 'DECREMENT':
            return state-1
        defalut:
            return state;
    }
}
```
## 原则
### 单一数据源
整个应用的state存储在一个object tree，并且这个object tree只存在于唯一一个store中

### state是只读的
唯一改变state的方法就是 ==触发action===，action是一个用于描述已发生事件的普通对象

### 纯函数（reducers)来执行修改
为了描述action如何改变，需要编写reducers


## Demo说明
### hello-redux
- 实现了一个简单的数字加减的demo,按钮绑定事件是dispatch(action),触发action实现
- 根据已有的reducer来创建store，即将Reducer传入creactStore()
#### 使用方法
- 克隆或下载至本地
- cd hello-redux
- npm install
- npm start

### hello-react-redux
- 实现了一个简单的数字加减、异步获取用户邮箱的demo

#### 知识点
**1.** 建立容器组件将展示组件和Redux关联起来。技术上讲，容器组建就是store.subscribe，但是这个项目中使用的是 React Redux库中的connect()方法来生成


**2.** 使用connect()直线，要定义mapStateToProps这个函数指定如何把当前Redux store state映射到展示组建的props
```
const mapStateToProps = (state)=>{
//提取state中的counter.
    return {
        counter:state.counter
    }
}
```
**3.**  除了读取state，容器组件还能分发action。可以定义mapDispatchToProps()方法接收dispatch()方法并返回期望注入展示组件的props中的回调方法
```
const mapDispatchToProps =(dispatch)=>{
    //第一种方法
    return{
        increment:()=>{dispatch(increment())},
        decrement:()=>{dispatch(decrement())}
    }
//第二种方法 的第一种写法。
  // return {
  //   increment:bindActionCreators(increment,dispatch),
  //   decrement:bindActionCreators(decrement,dispatch)
  // }
  
  //第二种方法 的第二种写法
  return bindActionCreators({increment,decrement},dispatch)
}

//从redux库中引入bindActionCreactors方法。
```
再使用connect方法
```
export default connect(mapStateToProps,mapDispatchToProps)(App);
```
- 使用中间件
```
//index.js

//打印变化过程的中间件
const logger = store=>next=>action=>{
    //三个箭头函数的嵌套
    console.log("dispatching...",action);//动作
    let result - next(action);
    console.log('next store',store.getState());//改变之后的state
    return result;
    
}

//打印处理错误的中间件
const error = store=>next=>action=>{
    try{
        next(action)
    }catch(e){
        console.log("error"+e);
    }
}

//使用中间件
store = createStore(rootReducer,{},applyMiddleWare(logger,error));
```

**4.** 使用React Redux组件中的<provider>来让所有容器组建都可以访问store而不用显式传递，只需要在根组件渲染
```
render(){
    return(
        <Provider store={store} > //传递store
            <App />
        <Provider / >
    ),
    document.getElementById('root');
}
```
**5.** 当action异步，返回函数时，因为规定action必须返回对象，所以需要应入redux-thunk改造dispatch。使得可以接收函数
```
//  actions/index.js
export const increment = ()=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch({
                type:INCREMENT
            })
        },1000)
    }
}

//在index.js中引入thunk中间件
import thunk from 'redux-thunk'

//再应用中间件
store = createStore(rootReducer,{},applyMiddleWare(logger,error,thunk));
```

**6.** redux-promise-middleware

异步处理中间件，再启用它之后，可以触发一个payload属性为promise对象的action
```
// actions/index.js
    export const getUser = ()=>({
        type:LOAD_USER,
        payload:axios.get("https://randomuser.me/api/") //payload属性接收promise属性为参数。
    })
```
这个中间件会立即出发一个action,类型为我们声明的类型上加上_PENDING  
```
{type:'LOAD_USER_PENDING'
```
等promise对象的状态发生改变（resolved或者rejected),中间件会触发一个action,并且带着promise的信息
```
{
    type:'LOAD_USER_FULFILLED',  //成功状态
}

{
    type:'LOAD_USER_REJECTED', //失败状态
}
```
**注意**：这些状态都是可以自动生成的，开发人员只需要在最初写一个action,指定类型


**7.** combineReducers

react中的方法，可以将多个reducer合并为一个
```
    const rootReducer = combineReducers({
        counter, //counter:counter
        user    //user:user
    })
```

#### 使用方法
- 克隆或下载到本地
- cd hello-react-redux
- npm install 
- npm start
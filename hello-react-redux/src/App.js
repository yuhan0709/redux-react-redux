import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {increment,decrement} from './actions';
import {increment,decrement}  from './actions';
import {bindActionCreators} from 'redux';
import User from './components/User';
class App extends Component {
  increse(){
    this.props.increment()
  }
 decrese(){
  this.props.decrement()
 }

  render() {
    console.log(this.props);
    return (
      <div className="App">
          <h1 className="text-center">{this.props.counter}</h1>
          <p className="text-center">
            <button onClick={this.increse.bind(this)}className="btn btn-primary mr-2">Increase</button>
            <button onClick={this.decrese.bind(this)}className="btn btn-danger my-2">Decrease</button>
          </p>
          
          <User/>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  //把state变成props
  return{
    counter:state.counter
  }
}
const mapDispatchToProps = (dispatch)=>{
  //第二种方法
  // return {
  //   increment:()=>{dispatch(increment())},
  //   decrement:()=>{dispatch(decrement())}
  // }

  //第三种方法 的第一种写法。
  // return {
  //   increment:bindActionCreators(increment,dispatch),
  //   decrement:bindActionCreators(decrement,dispatch)
  // }
  
  //第三种方法 的第二种写法
  return bindActionCreators({increment,decrement},dispatch)
}
App.propTypes = {
  counter:PropTypes.number.isRequired,
  increment:PropTypes.func.isRequired,
  decrement:PropTypes.func.isRequired
  
}


//第一种把actions传递到组件的方法
//export default connect(mapStateToProps)(App);

//第二、三种把actions传递到组件的方法
export default connect(mapStateToProps,mapDispatchToProps)(App);

//第四种把actions传递到组的方法
// export default connect(mapStateToProps,{increment,decrement})(App)
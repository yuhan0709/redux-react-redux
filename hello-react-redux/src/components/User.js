import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../actions';
class User extends Component {
    constructor(props){
        super(props);
    }
    getRandomUser(){
        this.props.getUser();
    }
    render(){
        const {error,isFetching,user} = this.props.user;
        console.log(this.props.user);
        let data;
        if(error){
            data = error
        }else if(isFetching){
            data = "Loading..."
        }else{
            data = user.email;
        }
        return(
            <div>
                <h1 className="text-center">{data}</h1>
                <p className="text-center">
                    <button onClick={this.getRandomUser.bind(this)} className="btn btn-success mr-2">GET RANDOM USER</button> 
                </p>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    //把state变成props
    return{
        user:state.user
    }
  }
export default connect(mapStateToProps,{getUser})(User);
//export default User;
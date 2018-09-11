import {INCREMENT,DECREMENT} from '../constants'
import {FETCH_USER_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_FAILURE} from '../constants';
import {LOAD_USER} from '../constants';
import axios from 'axios';
export const increment = ()=>{
    //返回函数，异步方法需要用的redux-thunk
    return dispatch=>{
        setTimeout(()=>{
            dispatch({
                type:INCREMENT
            })
        },1000)
    }
}
export const decrement = ()=>{
    //简单的action 直接返回的是对象
    return{
        type:DECREMENT
    }
}

//运用redux-thunk实现异步ajax
// export const getUser = (user)=>{
//     return dispatch=>{
//         dispatch(fetch_user_request())
//         axios.get("https://randomuser.me/api/")
//         .then(res=>{
//             dispatch(fetch_user_success(res.data.results[0]))
//         })
//         .catch(error=>{
//             dispatch(fetch_user_failure(error));
//         })
//     }
// }
// export const fetch_user_success = (user)=>{
//     return{
//         type:FETCH_USER_SUCCESS,
//         user
//     }
// }
// export const fetch_user_request = ()=>{
//     return {
//         type:FETCH_USER_REQUEST
//     }
// }
// export const fetch_user_failure = (error)=>{
//     return{
//         type:FETCH_USER_FAILURE,
//         error
//     }
// }

export const getUser = ()=>({
    type:LOAD_USER,
    payload:axios.get("https://randomuser.me/api/")
})
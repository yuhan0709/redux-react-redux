//action是改变store内state的唯一途径
import {INCREMENT, DECREMENT} from '../constants'
export const increment = ()=>{
    return {
        type:INCREMENT
    }
}
export const decrement = ()=>{
    return {
        type:DECREMENT
    }
}
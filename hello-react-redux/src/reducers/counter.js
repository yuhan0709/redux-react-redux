const counter = (state = 0, action={}) => {
    switch (action.type) {
        case 'INCREMENT':
            return state+1;
            //抛出错误测试中间件。
            //throw new Error("error in INCREMENT");
        case 'DECREMENT':
            return state-1;
        default:
            return state
    }
}
export default counter;
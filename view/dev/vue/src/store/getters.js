let getters = {  //为 state的计算属性
    //获取当前的用户信息
    getCurrentUserInfo: (state) => {
        return state.currentUserInfo
    }
}


export default getters;
//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";

import {request} from "../../utils"

const userStore = createSlice({
    name: "user",
    //数据状态
    initialState:{
        tocken:''
    },

    reducers:{
        setToken(state,action){
            state.tocken = action.payload
        }
    }
})

// 解构出actionCreater
const { setToken } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token
const fetchLogin = (loginForm)=>{

    return async(dispatch) => {
        // 1. 发送异步请求
        const res = await request.post('/authorizations', loginForm)

        // 2. 提交同步action进行tocken的存入
        dispatch(setToken(res.data.token))
        console.log("token:"+res.data.token)

    }
    
}


export {fetchLogin, setToken}

export default userReducer
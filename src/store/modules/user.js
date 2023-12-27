//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";

import {removeToken, request} from "../../utils"

import { setToken as _setToken, getToken } from "../../utils"

const userStore = createSlice({
    name: "user",
    //数据状态
    initialState:{
        token: getToken()|| '',
        userInfo: {}
    },

    reducers:{
        setToken(state, action){
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action){
            state.userInfo = action.payload

        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo} = userStore.actions

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

//获取个人信息 异步方法
const fetchUserInfo = ()=>{

    return async(dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))

    }
    
}


export {fetchLogin, fetchUserInfo, setToken, setUserInfo, clearUserInfo}

export default userReducer
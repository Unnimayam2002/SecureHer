import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { getDecodedData, getUserData } from "../utils/storageHandler";

export const userslice=createSlice({
    name:'user',
    initialState:{
        isLogin:getUserData()?true : false,
        token:getUserData() || null,
        name:getDecodedData()?.name || null,
        email:getDecodedData()?.email || null,
        role:getDecodedData()?.role || null
    },
    reducers:{
        signup(state){
           state.isLogin = true,
           state.token = token,
           state.name = name,
           state.email = email         
        },
        login:((state,action)=>{
            // console.log(action.payload);
            state.token = action.payload
            const decoded = jwtDecode(action.payload)
            console.log(decoded);
            state.role = decoded.role,
            state.isLogin = true,
            state.name = decoded.name,
            state.email = decoded.email
        }),
        logout(state){
           state.isLogin = false,
           state.token = null,
           state.name = null,
           state.email = null
        }

    }
})
export const { signup, login, logout }=userslice.actions
export default userslice.reducer
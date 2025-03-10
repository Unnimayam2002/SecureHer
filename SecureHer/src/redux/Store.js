import { configureStore } from "@reduxjs/toolkit";
import count from "./Counterslice";
import user from "./Userslice";


export const store = configureStore({
reducer:{
    counter:count, //{value:0}
    auth:user
}
})

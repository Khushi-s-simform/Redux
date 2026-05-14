export const LOGIN_REQUEST = 'authAction/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'authAction/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'authAction/LOGIN_FAIL';
export const LOGOUT = 'authAction/LOGOUT';
export const LOAD_USER = 'authAction/LOAD_USER';
export const REGISTER_SUCCESS = 'authAction/REGISTER_SUCCESS';

import { api } from "../api";
import { getToken , setToken , removeToken } from "../storageHelper";

export const loginUser = (email:string , password:string) => async(dispatch:any) =>  {
    dispatch({type:LOGIN_REQUEST})

    try {
        const res = await api.post("/users/login", {
            email ,
            password,
        })

        const token = res.data.data.accessToken;
        console.log(token);
        console.log(res.data);
        
        setToken(token)
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:{
                user:res.data.data.user,
                token:res.data.data.accessToken
            }
        })

    } catch (error:any) {
        dispatch({
            type:LOGIN_FAIL,
            payload : error.res.data.message
        })
    }
}


export const registerUser = (data:any) => async(dispatch:any) => {
    dispatch({
        type:LOGIN_REQUEST,
    })

    try {
        const res = await api.post('/users/register', data);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data.message
        })
    } 
    catch (error:any) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error?.response?.data?.message || error.message,
        })
    }
}


export const loadUser = () => async(dispatch:any) => {
    try {
        const token = await getToken();

        if(token) {
            dispatch({
                type:LOAD_USER,
                payload:token,
            })
        }
    } catch (error) {
        console.log("Load user Error");
        
    }
}

export const logoutUser = () => async(dispatch:any) => {
    await removeToken();
    dispatch({type:LOGOUT})
}
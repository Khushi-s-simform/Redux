import {
    LOAD_USER,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT
}from '../actions/AuthAction';
import { AuthActions, AuthState } from "./reducerTypes";

const initialState:AuthState = {
    loading: false,
    token: null,
    user: null,
    error: null,
    success: null,
}

export const authReducer  = (
    state = initialState,
    action:AuthActions ,
  ): AuthState => {

    switch (action.type) {
        
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
          success: 'Login successful',
        };
  
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case LOGIN_FAIL:
        console.log('login failed');
  
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case LOAD_USER:
        return { ...state, loading: false, token: action.payload };
  
      case LOGOUT:
        return {
          ...state,
          loading: false,
          token: null,
          user: null,
          success: null,
          error: null,
        };
  
      default:
        return state;
    }
  };
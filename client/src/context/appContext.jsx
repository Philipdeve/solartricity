import React, { useReducer, useContext, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import { TOGGLE_SIDEBAR,SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,  CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS} from "./actions";

import reducer from "./reducer";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showSideBar: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  }
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    })
  };
  
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.setItem("user");
    localStorage.setItem("token");
    
  };
  
  const adminSignup = async (currentUser) => {
    dispatch({ type: SIGNUP });
    try {
      const {data} = await axios.post("/api/v1/auth/admin-signup", currentUser);
      const { user, token } = data;
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { user, token },
      });
      toast.success("User Created, Redirecting..........",  {
        autoClose: 2000,
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      toast.error(error.response.data.msg)
      dispatch({
        type: SIGNUP_ERROR,
        payload: { msg: error.response.data.msg },
      });
    } 
  }; 

  const adminSignin = async (currentUser) => {
    dispatch({ type: SIGNIN });
    try {
      const {data} = await axios.post("/api/v1/auth/admin-signin", currentUser);
      const { user, token } = data;
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user, token },
      });
      toast.success("User Logged In, Redirecting..........",  {
        autoClose: 2000,
      });
      addUserToLocalStorage({ user, token});
    } catch (error) {
      toast.error(error.response.data.msg)
      dispatch({
        type: SIGNIN_ERROR,
        payload: { msg: error.response.data.msg }
      });
    }
  };
  
  const signup = async (currentUser) => {
    dispatch({ type: SIGNUP });
    try {
      const {data} = await axios.post("/api/v1/auth/signup", currentUser);
      const { user, token } = data;
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { user, token },
      });
      toast.success("User Created, Redirecting..........",  {
        autoClose: 2000,
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      toast.error(error.response.data.msg)
      dispatch({
        type: SIGNUP_ERROR,
        payload: { msg: error.response.data.msg },
      });
    } 
  }; 

  const signin = async (currentUser) => {
    dispatch({ type: SIGNIN });
    try {
      const {data} = await axios.post("/api/v1/auth/signin", currentUser);
      const { user, token } = data;
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user, token },
      });
      toast.success("User Logged In, Redirecting..........",  {
        autoClose: 2000,
      });
      addUserToLocalStorage({ user, token});
    } catch (error) {
      dispatch({
        type: SIGNIN_ERROR,
        payload: { msg: error.response.data.msg }
      });
      toast.error(error.response.data.msg)
    }
  };

  const addToCart = async(product, quantity) => {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {...product, quantity}
    });
  }

  const removeCartItem = async(product) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {...product}
    });
    toast.success("Product removed from cart",  {
      autoClose: 2000,
    });
  }

  const saveShippingAddress = async (shippingData) => {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS, 
      payload: {...shippingData}
    })
    toast.success("Shipping Address saved",  {
      autoClose: 1000,
    });
  }

  return (
    <AppContext.Provider value={{ ...state, toggleSidebar, adminSignup, adminSignin, addToCart, removeCartItem, signup, signin, saveShippingAddress}}>
      {children}
    </AppContext.Provider>
  );
};


const useAppContext = () => {
    // Returns a stateful value, and a function to update it.
    return useContext(AppContext);
  };
  
export { AppProvider, initialState, useAppContext };

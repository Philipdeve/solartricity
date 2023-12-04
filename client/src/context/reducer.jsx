import {
  TOGGLE_SIDEBAR,
  ADMIN_SIGNUP,
  ADMIN_SIGNUP_SUCCESS,
  ADMIN_SIGNUP_ERROR,
  ADMIN_SIGNIN,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNIN_ERROR,
  CLEAR_VALUES,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSideBar: !state.showSideBar };
  }

  if (action.type === ADMIN_SIGNUP) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADMIN_SIGNUP_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === ADMIN_SIGNUP_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === ADMIN_SIGNIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADMIN_SIGNIN_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === ADMIN_SIGNIN_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CART_ADD_ITEM) {
    const newItem = action.payload;
  
    const existItem = state.cart.cartItems.find(
      (item) => item._id === newItem._id
    );

    // console.log("existItem:", existItem);
  
    const cartItems = existItem
      ? state.cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
      : [...state.cart.cartItems, newItem];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return {
      ...state,
      cart: { ...state.cart, cartItems },
    };
  }

  if (action.type === CART_REMOVE_ITEM){
    const cartItems = state.cart.cartItems.filter(
      (item) => item._id !== action.payload._id
    );
    console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return { ...state, cart: { ...state.cart, cartItems } };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;

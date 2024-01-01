import {
  TOGGLE_SIDEBAR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSideBar: !state.showSideBar };
  }

  if (action.type === SIGNUP) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SIGNUP_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === SIGNUP_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === SIGNIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SIGNIN_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === SIGNIN_ERROR) {
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

  if (action.type === SAVE_SHIPPING_ADDRESS){
    const shippingData = action.payload;
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
    return { ...state, cart: { ...state.cart, shippingData } };

  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;

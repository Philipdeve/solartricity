import {
  TOGGLE_SIDEBAR,
  ADMIN_SIGNUP,
  ADMIN_SIGNUP_SUCCESS,
  ADMIN_SIGNUP_ERROR, ADMIN_SIGNIN, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_ERROR
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

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;

import React, { useReducer, useContext, useEffect } from "react";

import { TOGGLE_SIDEBAR } from "./actions";

import reducer from "./reducer";

const initialState = {
  isLoading: false,
  showSideBar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    })
  };

  return (
    <AppContext.Provider value={{ ...state, toggleSidebar}}>
      {children}
    </AppContext.Provider>
  );
};


const useAppContext = () => {
    // Returns a stateful value, and a function to update it.
    return useContext(AppContext);
  };
  
export { AppProvider, initialState, useAppContext };

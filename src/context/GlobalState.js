import React, { createContext, useReducer, useContext } from 'react';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOUR_ACTIVE':
      return {
        ...state,
        isTourActive: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isTourActive: false,
  });

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);

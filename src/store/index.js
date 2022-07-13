import React, { createContext, useReducer } from 'react';

import reducer from '../reducer/filterReducer'

const initialState = {
  gender: '',
  searchQuery: '',
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};

export default Store;
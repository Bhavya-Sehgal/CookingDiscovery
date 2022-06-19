import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const Initial_State = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  token: localStorage.getItem("token") || null,
};

export const Context = createContext(Initial_State);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, Initial_State);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
  }, [state.user, state.token]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

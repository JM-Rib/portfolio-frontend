import { useReducer, useCallback } from "react";

const initialState = {
  data: null,
  error: "",
  loading: false
};

const actionTypes = {
  SET_DATA: "SET_DATA",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return { ...state, data: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default (apiFunc) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const request = useCallback((...args) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = apiFunc(...args);
      response.then( r => {
        if(process.env.REACT_APP_DEBUG !== undefined){
          console.log(r);
        }
        if (r?.status === 200) {
          dispatch({ type: actionTypes.SET_DATA, payload: r.data });
        } 
      }).catch( (err) => {
        if(process.env.REACT_APP_DEBUG !== undefined){
          console.log(err);
          console.log(err?.response.status);
        } 
      });
      dispatch({ type: actionTypes.SET_DATA, payload: response.data });
      return response;
    } catch (err) {
      dispatch({ type: actionTypes.SET_ERROR, payload: err.message || "Unexpected Error!" });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  }, [apiFunc]);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    request
  };
};
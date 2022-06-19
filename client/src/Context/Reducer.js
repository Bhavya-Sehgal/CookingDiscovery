const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        token: action.token,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        token: null,
      };
    case "UPDATE_START":
      return {
        // user:null,
        ...state,
        isFetching: true,
        // error: false,
        // token: null,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        token: action.token,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
        token: state.token,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        token: null,
      };
    default:
      return state;
  }
};

export default Reducer;

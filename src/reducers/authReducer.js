import { authConstant } from "../actions/constant";

const iniState = {
  name: "",
  email: "",
  authenticating: "",
  authenticated: "",
  error: null
};

export default (state = iniState, action) => {
  switch (action.type) {
    case `${authConstant.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true
      };
      break;
    case `${authConstant.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticating: false,
        authenticated: true
      };
      break;
    case `${authConstant.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
        authenticating: false,
        authenticated: false
      };
      break;
    case `${authConstant.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstant.USER_LOGOUT}_SUCCESS`:
      state = {
        ...iniState
      };
      break;
    case `${authConstant.USER_LOGOUT}_FAILURE`:
      state = {
        ...iniState,
        error: action.payload.error
      };
      break;
    // default:
    //   state = {
    //     ...state
    //   };
    //   break;
  }
  return state;
};

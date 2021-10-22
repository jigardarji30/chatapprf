import { userConstant } from "../actions/constant";

const iniState = {
  users: [],
  messages: []
};

export default (state = iniState, action) => {
  switch (action.type) {
    case `${userConstant.GET_REALTIME_USERS}_REQUEST`:
      break;
    case `${userConstant.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users
      };
      break;
    case `${userConstant.GET_REALTIME_MESSAGES}_SUCCESS`:
      state = {
        ...state,
        messages: action.payload.messages
      };
      break;
    case `${userConstant.GET_REALTIME_MESSAGES}_FAILURE`:
      state = {
        ...state,
        messages: []
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

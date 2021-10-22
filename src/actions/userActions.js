import db from "../firebase.config";
import { userConstant } from "./constant";
import { collection, query, where, addDoc, getDocs, orderBy } from "firebase/firestore";

/**
 * get realtime users from db firebase action
 * @param {*} uid
 * @returns unsubscribe
 */
export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstant.GET_REALTIME_USERS}_REQUEST` });

    const unsubscribe = getDocs(collection(db, "users")).then((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }

        dispatch({
          type: `${userConstant.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users: users }
        });
      });
    });
    return unsubscribe;
  };
};

/**
 * store user messages in db firebase action
 * @param {*} messageObj
 * @returns
 */
export const updateMessage = (messageObj) => {
  return async (dispatch) => {
    addDoc(collection(db, "messages"), {
      ...messageObj,
      isView: false,
      createdAt: new Date()
    })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * get realtime user messages from db firebase action
 * @param {*} user
 * @returns
 */
export const getRealtimeMessages = (user) => {
  return async (dispatch) => {
    const q = query(collection(db, "messages"), where("user_uid_1", "in", [user.user_uid_1, user.user_uid_2]), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      if ((doc.data().user_uid_1 === user.user_uid_1 && doc.data().user_uid_2 === user.user_uid_2) || (doc.data().user_uid_1 === user.user_uid_2 && doc.data().user_uid_2 === user.user_uid_1)) {
        messages.push(doc.data());
      }
    });
    if (messages.length > 0) {
      dispatch({
        type: `${userConstant.GET_REALTIME_MESSAGES}_SUCCESS`,
        payload: { messages: messages }
      });
    } else {
      dispatch({
        type: `${userConstant.GET_REALTIME_MESSAGES}_FAILURE`,
        payload: { messages: messages }
      });
    }
  };
};

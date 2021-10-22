import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import db from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { authConstant } from "./constant";

/**
 * register user action
 * @param {*} user
 * @returns
 */
export const register = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_REQUEST`
    });

    const auth = getAuth();
    // create email and password firebase
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const users = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: `${user.name || "unknown user"}`
        }).then((data) => {
          // add more details when email and password available firebase
          addDoc(collection(db, "users"), {
            name: user.name || "unknown user",
            uid: users.uid,
            createdAt: new Date(),
            isOnline: true
          })
            .then(() => {
              const loggedInUser = {
                name: user.name || "unknown user",
                uid: users.uid,
                email: users.email
              };

              localStorage.setItem("user", JSON.stringify(loggedInUser));
              console.log("login success");
              dispatch({
                type: `${authConstant.USER_LOGIN}_SUCCESS`,
                payload: { user: loggedInUser }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE`,
          payload: { error }
        });
      });
  };
};

/**
 * login user firebase actions
 * @param {*} user
 * @returns
 */
export const signin = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_REQUEST`
    });

    const auth = getAuth();
    // login with email and password firebase
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const users = userCredential.user;
        const loggedInUser = {
          name: user.name || "unknown user",
          uid: users.uid,
          email: users.email
        };

        localStorage.setItem("user", JSON.stringify(loggedInUser));
        console.log("login success");
        dispatch({
          type: `${authConstant.USER_LOGIN}_SUCCESS`,
          payload: { user: loggedInUser }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE`,
          payload: { error }
        });
      });
  };
};

/**
 * check user loggedin firebase action
 * @returns
 */
export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (user) {
      dispatch({
        type: `${authConstant.USER_LOGIN}_SUCCESS`,
        payload: { user }
      });
    } else {
      dispatch({
        type: `${authConstant.USER_LOGIN}_FAILURE`,
        payload: { error: "error" }
      });
    }
  };
};

/**
 * logout user firebase action
 * @param {*} uid
 * @returns
 */
export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstant.USER_LOGOUT}_REQUEST`
    });

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        dispatch({
          type: `${authConstant.USER_LOGOUT}_SUCCESS`
        });
        console.log("logout success");
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstant.USER_LOGOUT}_FAILURE`,
          payload: { error }
        });
      });
  };
};

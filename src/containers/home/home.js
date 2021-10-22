import "./home.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../../components/layouts";
import { useDispatch, useSelector } from "react-redux";
import { getRealtimeMessages, getRealtimeUsers, updateMessage } from "../../actions/index";
import User from "./user";

/**
 * home page for chat one user with another user
 * @author
 * @function Home
 **/
const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const state = useSelector((state) => state.auth);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUidReceiver, setUserUidReceiver] = useState(null);
  const [init, setinit] = useState(null);

  // get data from reducer
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    // dispatch real time user list
    dispatch(getRealtimeUsers(state.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {});
  }, []);

  // open user chat screen
  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.name}`);
    setUserUidReceiver(user.uid);

    setinit(user);
    dispatch(getRealtimeMessages({ user_uid_1: auth.uid, user_uid_2: user.uid }));
  };

  // submit message to another user
  const submitMessage = (e) => {
    const messageObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUidReceiver,
      message
    };

    if (message !== "") {
      dispatch(updateMessage(messageObj));
      setMessage("");
    }
    initChat(init);
  };

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users !== undefined
            ? user.users.length > 0
              ? user.users.map((userdata, i) => {
                  return <User key={userdata.uid} user={userdata} onClick={initChat} />;
                })
              : null
            : null}
        </div>
        <div className="chatArea">
          <div className="chatHeader">{chatStarted ? chatUser : null} </div>

          <div className="messageSections">
            {chatStarted
              ? user.messages !== undefined
                ? user.messages.map((msg, i) => {
                    return (
                      <div key={i} style={{ textAlign: msg.user_uid_1 === auth.uid ? "right" : "left" }}>
                        <p className="messageStyle">{msg.message}</p>
                      </div>
                    );
                  })
                : null
              : null}
          </div>
          {chatStarted ? (
            <div className="chatControls">
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write Message" />
              <button onClick={submitMessage}>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default Home;

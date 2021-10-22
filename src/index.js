import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import store from "./store/store";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCl6EFvv_qt6wEk7bK93SRtRHw7wP0ufbM",
  authDomain: "chatapp-7c5c4.firebaseapp.com",
  projectId: "chatapp-7c5c4",
  storageBucket: "chatapp-7c5c4.appspot.com",
  messagingSenderId: "218097795564",
  appId: "1:218097795564:web:ecd3f0995a1d561c4740c9",
  measurementId: "G-QN74MZ53QK"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

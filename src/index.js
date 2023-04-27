import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./components/store/auth_context";
import { UserAuthProvider } from "./components/store/user_auth_context";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserAuthProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UserAuthProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import "./styling/style.css";
import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import SignUpForm from "./components/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Nav from "./components/Nav";
import ForgotPassword from "./components/ForgotPassword";
import Landing from "./screens/Landing";

import { Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log({ user });
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  return (
    <>
      <div className="App"> Malin Movie Sida</div>
      {loggedIn && <Nav />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/movie/:title" element={<MovieDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;

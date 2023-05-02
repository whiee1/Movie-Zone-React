import "./styling/style.css";
import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import SignUpForm from "./components/SignUp";
import { getAuth } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import UserAuthContext from "./components/store/user_auth_context";
import Nav from "./components/Nav";
import ForgotPassword from "./components/ForgotPassword";
import Landing from "./screens/Landing";
import { Routes, Route } from "react-router-dom";

import SearchPage from "./screens/SearchPage";

function App() {
  const { signUp, logIn, logOut, resetPassword, deleteAccount } =
    useContext(UserAuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    setIsLoggedIn(loggedIn);
  }, [signUp, logIn, logOut, resetPassword, deleteAccount]);
  console.log({ isLoggedIn });

  return (
    <>
      <div className="App"> Malin Movie Sida</div>

      {isLoggedIn && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {isLoggedIn && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/movie/:title" element={<MovieDetails />} />
              <Route path="/search/:searchKey" element={<SearchPage />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;

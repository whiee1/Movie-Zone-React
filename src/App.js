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
import { Routes, Route, useNavigate } from "react-router-dom";
import LogInForm from "./components/LogIn";
import SearchPage from "./screens/SearchPage";

function App() {
  const navigate = useNavigate();
  const { signUp, logIn, logOut, resetPassword, deleteAccount } =
    useContext(UserAuthContext);

  const isLoggedIn = sessionStorage.getItem("loggedIn");

  console.log({ isLoggedIn });

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, []);

  return (
    <>
      <div className="App"> Malin Movie Sida</div>

      {isLoggedIn && <Nav />}
      <main>
        <Routes>
          <Route path="/login" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:title" element={<MovieDetails />} />
            <Route path="/search/:searchKey" element={<SearchPage />} />
          </>
        </Routes>
      </main>
    </>
  );
}

export default App;

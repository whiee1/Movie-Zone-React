import "./styling/style.css";
import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import SignUpForm from "./components/SignUp";
import { useContext, useEffect } from "react";
import UserAuthContext from "./components/store/user_auth_context";
import Nav from "./components/Nav";
import ForgotPassword from "./components/ForgotPassword";
import { Routes, Route, useNavigate } from "react-router-dom";
import LogInForm from "./components/LogIn";
import SearchPage from "./screens/SearchPage";
import MovieZone from "./components/ui/MovieZone";
import Profile from "./screens/Profile";
function App() {
  const navigate = useNavigate();
  const context = useContext(UserAuthContext);
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  // Kollar om användaren står som inloggad i sessionStorage, om nej så navigeras användaren till login sidan.
  useEffect(() => {
    (async () => {
      !isLoggedIn && navigate("/login");
    })();
  }, []);

  return (
    <>
      <MovieZone />

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
            <Route path="/profile" element={<Profile />} />
          </>
        </Routes>
      </main>
    </>
  );
}

export default App;

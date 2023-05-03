import { useState, useContext } from "react";

import UserAuthContext from "./store/user_auth_context";
import { Link, useNavigate } from "react-router-dom";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const context = useContext(UserAuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const result = await context.logIn(email, password);
      if (result.success) {
        sessionStorage.setItem("loggedIn", true);
        navigate("/");
      } else {
        setError("Email or password is incorrect");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2>Sign In</h2>
        {error && (
          <div className="error">
            <h3>{error}</h3>
          </div>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="fieldWrapper">
            <label htmlFor="emailField" />
            Email:
            <input
              id="emailField"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="fieldWrapper">
            <label htmlFor="passwordInputField" />
            Password:
            <input
              id="passwordInputField"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="middle">
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>

          <button className="btnPrimary" type="submit">
            Sign In
          </button>
        </form>
      </div>

      <div className="middle">
        Don't have an account? <Link to={"/signup"}> Sign up!</Link>{" "}
      </div>
    </div>
  );
};

export default LogInForm;

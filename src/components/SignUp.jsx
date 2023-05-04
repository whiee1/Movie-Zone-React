import { useState, useContext } from "react";
import UserAuthContext from "./store/user_auth_context";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const context = useContext(UserAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      const result = await context.signUp(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setErrorMessage("Failed to create an account."); // låste lägga till conditional rendering. Olkart om mail är upptagen eller lösen för kort
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2>Sign Up</h2>
        {errorMessage && (
          <div className="error">
            <h3>{errorMessage}</h3>
          </div>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="fieldWrapper">
            <label htmlFor="signUpEmail" />
            Email:
            <input
              id="signUpEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="fieldWrapper">
            <label htmlFor="signUpPassword" />
            Password:
            <input
              id="signUpPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btnPrimary" type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <div className="middle outsideFormLink">
        Already have an account? <Link to={"/login"}>Sign In</Link>
      </div>
    </div>
  );
};

export default SignUpForm;

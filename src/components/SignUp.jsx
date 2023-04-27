import { useState, useContext } from "react";
import UserAuthContext from "./store/user_auth_context";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const context = useContext(UserAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const result = await context.signUp(email, password);
      if (result.success) {
        navigate("/home");
      } else {
        setError("Email is already registrated");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formContainer">
      <h2>Sign Up</h2>
      {error && (
        <div className="error">
          <h3>{error}</h3>
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
        <button type="submit">Sign Up</button>
      </form>

      <div>
        Already have an account? <Link to={"/"}>Log in</Link>{" "}
      </div>
    </div>
  );
};

export default SignUpForm;

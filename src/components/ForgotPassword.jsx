import { useState, useContext } from "react";
import UserAuthContext from "./store/user_auth_context";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(UserAuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*send the user email to Firebase and check if it exists in the Auth system */
    try {
      setError("");
      const result = await context.resetPassword(email);
      setEmailMessage(true);
      if (result.success) {
        setEmail("");
        console.log("successssssssss");
      } else {
        setError("Failed to reset password.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        {error && (
          <div className="error">
            <h3>{error}</h3>
          </div>
        )}
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

        <button type="submit">Reset Password</button>
      </form>
      <div>
        <Link to={"/"}> Sign In</Link>
      </div>

      <div>
        Don't have an account? <Link to={"/signup"}> Sign up!</Link>{" "}
      </div>
    </div>
  );
};

export default ForgotPassword;
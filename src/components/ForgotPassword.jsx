import { useState, useContext } from "react";
import UserAuthContext from "./store/user_auth_context";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const context = useContext(UserAuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*send the user email to Firebase and check if it exists in the Auth system */
    try {
      setErrorMessage("");
      const result = await context.resetPassword(email);
      setEmailMessage(true);
      if (result.success) {
        setEmail("");
        setSuccessMessage(
          "A mail to reset your password has been sent to the email you provided! Cant't find it? Look in spam"
        );

        console.log("successssssssss");
      } else {
        setErrorMessage("Failed to reset password.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        {successMessage ? (
          <div className="successMessage">
            <h3>{successMessage}</h3>
          </div>
        ) : (
          <>
            <h2>Forgot Password</h2>
            <form className="form" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="error">
                  <h3>{errorMessage}</h3>
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

              <button className="btnPrimary" type="submit">
                Reset Password
              </button>
              <div className="middle insideForkLink">
                <Link to={"/login"}> Sign In</Link>
              </div>
            </form>
          </>
        )}
      </div>
      <div className="middle outsideFormLink">
        Don't have an account? <Link to={"/signup"}> Sign up!</Link>{" "}
      </div>
    </div>
  );
};

export default ForgotPassword;

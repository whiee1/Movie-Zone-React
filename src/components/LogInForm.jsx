import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInForm = () => {
  //Lägg in i userAuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };
  //

  return (
    <div className="formContainer">
      <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LogInForm;

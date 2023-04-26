import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = () => {
  //Lägg in i userAuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
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
      <h1>Sign Up</h1>
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
    </div>
  );
};

export default SignUpForm;

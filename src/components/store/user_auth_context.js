import { createContext } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  //Funktioner
  // Loggar in
  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message }; //success för att kolla om error ska skrivas till användaren
    }
  };

  // Skapar nytt konto
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // skicka iväg ett reset password mail till emailen som användaren angett
  const resetPassword = async (email) => {
    const actionCodeSettings = {
      url: "http://localhost:3000/", //Skickar användaren till login sidan
      handleCodeInApp: false,
    };
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  //Loggar ut
  const logOut = () => {
    signOut(auth);
  };

  return (
    <UserAuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        resetPassword,
        // confirmPasswordReset,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;

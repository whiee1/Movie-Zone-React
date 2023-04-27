import { useState, createContext } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const auth = getAuth();

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
      return { success: false, message: error.message };
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
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  //Loggar ut
  const logOut = () => {
    return auth.signOut();
  };

  return (
    <UserAuthContext.Provider
      value={{
        signUp: signUp,
        logIn: logIn,
        logOut: logOut,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;

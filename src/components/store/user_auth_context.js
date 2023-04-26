import { useState, createContext, useContext } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  return (
    <UserAuthContext.Provider value={{}}>
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;

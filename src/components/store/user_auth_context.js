import { createContext } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../../firebase";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useState } from "react";

const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [savedMovie, setSavedMovie] = useState(false);
  //Funktioner
  // Loggar in
  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("loggedIn", "true");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message }; //success för att kolla om error ska skrivas till användaren
    }
  };
  const getUid = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    return uid;
  };

  const addMoviesToList = async (movie) => {
    const uid = getUid();

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        likedMovies: arrayUnion(movie),
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message, code: error.code };
    }
  };

  const [savedMovieList, setSavedMovieList] = useState([]);

  const removeMovieFromList = async (movie) => {
    const uid = getUid();

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        likedMovies: arrayRemove(movie),
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message, code: error.code };
    }
  };

  const getLikedMovies = async () => {
    const uid = getUid();
    try {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
      setSavedMovieList(userSnapshot.data().likedMovies);

      return { success: true, likedMovies: userSnapshot.data().likedMovies };
    } catch (error) {
      console.log(error.code);
      return { success: false, message: error.message, code: error.code };
    }
  };

  // Skapar nytt konto
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const uid = getUid();
      const ref = doc(db, "users", uid);
      await setDoc(ref, { email, likedMovies: [] }).then(() => {
        sessionStorage.setItem("loggedIn", "true");
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message, code: error.code };
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
    sessionStorage.clear();
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    const { email } = user;
    if (!user) {
      // Användaren är inte inloggad
      console.log("User is not signed in");
      return { success: false, error: "User is not signed in" };
    } else {
      //användaren behöver ange lösenord för att kunna ta bort kontot
      const password = prompt("Enter your password to delete your");

      const credential = EmailAuthProvider.credential(email, password);

      try {
        // authentisera användaren
        await reauthenticateWithCredential(user, credential);

        await user.delete();
        console.log("User account deleted successfully");
        sessionStorage.clear();
        return { success: true };
      } catch (error) {
        alert("Unable to delete account, try again.");
        return { success: false, error: "Unable to delete account" };
      }
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        resetPassword,
        deleteAccount,

        addMoviesToList,
        getLikedMovies,
        removeMovieFromList,
        savedMovie,
        setSavedMovie,

        savedMovieList,
        setSavedMovieList,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;

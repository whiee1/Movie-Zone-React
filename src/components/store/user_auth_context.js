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

//Context för användarautentisering som använder Firebase Authentication och Firestore.

const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [savedMovie, setSavedMovie] = useState(false);
  //Funktioner

  //Hämta den inloggade användarens id och returnera
  const getUid = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    return uid;
  };

  // Funktioner som har med att spara filmer att göra (Firestore)

  //Funktionsom lägger till en film i Firestore-databasen för användaren. firebase updateDoc auppdatera dokumentet och med arrayUnion läggas den nya filmen till arrayen "likedMovies" I firestore.
  const addMoviesToList = async (movie) => {
    const uid = getUid();

    try {
      const userRef = doc(db, "users", uid); //uid för att använda samma id som användaren har i Authentication
      await updateDoc(userRef, {
        likedMovies: arrayUnion(movie),
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message, code: error.code };
    }
  };

  const [savedMovieList, setSavedMovieList] = useState([]);

  // Funktion tar in ett film objekt och raderar filmen från likedMovies arrayen i Firestore. Om hämtningen misslyckas kommer error koden skrivas ut i consolen
  const removeMovieFromList = async (movie) => {
    const uid = getUid();

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        likedMovies: arrayRemove(movie),
      });
      return { success: true };
    } catch (error) {
      console.log(error.code);
      return { success: false, message: error.message, code: error.code };
    }
  };

  //Funktion som hämtar innehållet i likedMovies i användarens databas. Om hämtningen lyckas returneras likedMovies arrayen

  // likedMovies: userSnapshot.data().likedMovies är en nyckel-värde-paret som tilldelar värdet av likedMovies till variabeln likedMovies. Detta görs för att spara listan över filmerna som användaren har gillat från dokumentet som hämtas från Firestore-databasen. .
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

  //Funktinalitet för Firebase Authentication

  // Logga in funktion som använder signInWithEmailAndPassword-funktionen fron Firebase för att logga in en användare med e-postadress och lösenord. Om inloggningen lyckas så sparas key value i sessionStorage, och returnerar ett object med sucess key som har boolean värde.
  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("loggedIn", "true");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message }; //success för att kolla om error ska visas för användaren
    }
  };

  // Funktionen försöker skapa en användare med en given email och lösenord, och om det lyckas så lägger den till användaren i databasen med hjälp av firestore. Variabel i sessionStorage för att markera att användaren är inloggad.Om något går fel så fångar den upp det och returnerar ett objekt med success false, ett meddelande om vad som gick fel och en kod för felmeddelandet.
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

  // Funktionen skickar ett mail till den givna emailadressen med en länk för att återställa lösenordet. Om ett mail skickas så returneras ett objekt med success true. Om något går fel så fångar den upp det och returnerar ett objekt med success false och ett meddelande om vad som gick fel.

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

  //Loggar ut och rensar sessionStorage
  const logOut = () => {
    signOut(auth);
    sessionStorage.clear();
  };

  //Funktionen kollar såanvändaren är inloggad. Om ja så kommer den bli ombedd att ange sitt lösenord för att radera sitt konto, sen authentiseras användaren med email och lösenord och användaren raderas från Firebase Authentication. Om radering misslyckades får användaren upp en alert
  const deleteAccount = async () => {
    const user = auth.currentUser;
    const { email } = user;
    if (!user) {
      console.log("User is not signed in");
      return { success: false, error: "User is not signed in" };
    } else {
      const password = prompt("Enter your password to delete your");

      const credential = EmailAuthProvider.credential(email, password);

      try {
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

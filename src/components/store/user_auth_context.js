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
import { useState } from "react";

/*    error code för validering
      auth/weak-password
      auth/email-already-in-use

*/

const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

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
      sessionStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
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
      sessionStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      return { success: true };
    } catch (error) {
      console.log(error.code);
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
    setLoggedIn(false);
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    const { email } = user;
    if (!user) {
      // User is not currently signed in
      console.log("User is not signed in");
      return { success: false, error: "User is not signed in" };
    } else {
      //användaren behöver uppsatera sina credentials för att kunna radera sitt konto
      const password = prompt("Please enter your current password");

      const credential = EmailAuthProvider.credential(email, password);

      try {
        await reauthenticateWithCredential(user, credential);
        // User has been reauthenticated, now you can delete their account
        await user.delete();
        console.log("User account deleted successfully");
        sessionStorage.clear();
        return { success: true };
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          console.log("Wrong password entered");
          // Prompt the user to enter their current password again
          return { success: false, error: "Wrong password entered" };
        } else {
          console.error("Error deleting user:", error);
          return { success: false, error };
        }
      }
    }
  };

  //   //Be användaren om uppgifter
  //   const promptForCredentials = () => {
  //     const email = prompt("want to delete account?", "Enter your email:").value
  //     const password = prompt("Enter your password:");
  //     console.log("email password", email, password);
  //     if (email && password) {
  //       return;
  //     } else {
  //       return null;
  //     }
  //   };
  //  //Radera användar konto

  //   const deleteAccount = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       await user.delete();
  //       console.log("user Deleted");
  //       sessionStorage.clear();
  //       return { success: true };
  //     } catch (error) {
  //       promptForCredentials()
  //       console.error("Error deleting user:", error);
  //       return { success: false, message: error.message };
  //     }
  //   };

  // const deleteAccount = async () => {
  //   try {
  //     const user = auth.currentUser;
  //     console.log({ user });
  //     const credential = promptForCredentials(); // Replace with your own credentials collection method
  //     if (credential) {
  //       await user.reauthenticateWithCredential(credential);
  //       await user.delete();
  //       console.log("deleted");
  //       navigate("/");
  //     } else {
  //       throw new Error("Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to delete account.");
  //   }
  // };

  return (
    <UserAuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        resetPassword,
        deleteAccount,
        //state
        loggedIn,
        setLoggedIn,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;

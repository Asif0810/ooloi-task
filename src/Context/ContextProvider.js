import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebaseconfig/Firebase";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
export const Context = createContext(app);
const auth = getAuth();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const google = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const userInfo = {
    google,
    user,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      return () => {
        unsubscribe();
      };
    });
  }, []);
  return <Context.Provider value={userInfo}>{children}</Context.Provider>;
};

export default ContextProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Assuming you have the necessary Firebase imports here
import { auth } from "../Utils/Firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      // Optionally perform any additional actions after successful login
      setLoading(false);
    } catch (error) {
      console.error("Login failed", error);
      const errorMessage = error.message.split(": ")[1];
      // Set the extracted error message to a state variable
      setError(errorMessage);
    }
  };

  const signup = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      console.error("Failed to create a user", error);
      const errorMessage = error.message.split(": ")[1];

      setError(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setUser(null);
      localStorage.clear();
      setLoading(false);
    } catch (error) {
      console.error("Logout failed", error.message);
      const errorMessage = error.message.split(": ")[1];
      setError(errorMessage);
    }
  };

  const value = { user, loading, error, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

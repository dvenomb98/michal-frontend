/* eslint no-use-before-define: 0 */

import React, { useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextModel {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  user: User;
  logout: () => void;
}

const UserContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        signIn,
        user,
        logout,
      }}
    >
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

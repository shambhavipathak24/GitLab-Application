import React, {createContext, useState,useEffect, useContext} from 'react';
const AuthContext = createContext();// Create a context for authentication
// This context will provide authentication state and functions to the rest of the app
export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to use the AuthContext
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null); // State to hold the authenticated user
  useEffect(()=>{
    const userId=localStorage.getItem('userId');// Check if userId is stored in localStorage
    if(userId){
      setcurrentUser({ id: userId }); // If userId exists, set the currentUser state
    }
  },[]); // Empty dependency array means this effect runs once when the component mounts
  const value={
    currentUser, // Provide the current user state
    setcurrentUser, // Provide a function to update the current user state
  }
return <AuthContext.Provider value={value}>
    {children}</AuthContext.Provider> // Provide the AuthContext to children components
}
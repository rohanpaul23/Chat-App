import React, { useState } from 'react'
import { createContext,useContext } from "react";

export const UserContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserContextProvider = ({children}) => {
 const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("current-user")) || null);
 return (
   <UserContext.Provider value={{
    currentUser,
    setCurrentUser
   }}>
    {children}
   </UserContext.Provider>
  )
}


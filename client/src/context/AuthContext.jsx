import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    {}
  );

  const updateUser = (data) => {
    setCurrentUser(data.userInfo);
    localStorage.setItem("user", JSON.stringify(data.userInfo));
    console.log({data});
  };
useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  setCurrentUser(user || null)

},[])




  return (
    <AuthContext.Provider value={{ currentUser,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    {}
  );

  const updateUser = (data) => {
    setCurrentUser(data.userInfo);
    localStorage.setItem("user", JSON.stringify(data));
    console.log({data});
  };
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };
useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  setCurrentUser(user?.userInfo || null)
  console.log("useeffet user",user);
},[])

  return (
    <AuthContext.Provider value={{ currentUser,updateUser,logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
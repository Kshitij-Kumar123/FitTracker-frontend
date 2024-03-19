import React, { createContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // Initialize your data state here

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State variables for user data and tokens
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [userid, setuserid] = useState(null);

  // Use effect hook to load data from localStorage
  useEffect(() => {
    const savedUserName = localStorage.getItem("user_name");

    const savedAccessToken = localStorage.getItem("user_access_token");

    const savedUserId = localStorage.getItem("user_id");

    console.log("Retrieved from localStorage:", "name: ", savedUserName,
      "token: ", savedAccessToken,

      "user id: ", savedUserId);

    // Ensure saved values are not null/undefined before setting state
    if (savedUserName && savedAccessToken && savedUserId) {
      setUser(savedUserName);
      setAccessToken(savedAccessToken);

      setuserid(savedUserId);
    }
  }, []);  // Empty dependency array ensures this runs only once on component mount

  // Login function to set user data and store it in localStorage
  const loginUser = (userName, accessToken, user_id) => {
    setUser(userName);
    setAccessToken(accessToken);
    setuserid(user_id);

    // Store user data and tokens in localStorage
    localStorage.setItem("user_name", userName);
    localStorage.setItem("user_access_token", accessToken);

    localStorage.setItem("user_id", user_id);
  };

  // Logout function to clear user data and tokens from state and localStorage
  const logoutUser = () => {
    setUser(null);
    setAccessToken(null);
    setuserid(null);

    // Clear localStorage on logout
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_access_token");
    localStorage.removeItem("user_id");
  };

  // Return the UserContext provider to expose the context values
  return (
    <UserContext.Provider value={{ user, accessToken, userid, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const response = await fetch("https://api.mediehuset.net/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          user_id: data.user_id,
          email: data.user.email,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          token: data.access_token,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/"); 
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

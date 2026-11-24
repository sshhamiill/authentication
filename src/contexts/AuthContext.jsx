import {
  useState,
  useEffect
} from "react";

import { AuthContext } from "./authContextStore";
import {
  getUserByEmail,
  getUserById,
  createUser,
  getUserByUsername
} from "../services/authApi";

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("userId"))
  );

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = async ({ email, password }) => {
    const users = await getUserByEmail(email);
    if (users.length === 0) {
      throw new Error("User not found");
    }
    const existingUser = users[0];
    if (existingUser.password !== password) {
      throw new Error("Incorrect password");
    }

    localStorage.setItem("userId", existingUser.id);
    setUser(existingUser);
    return existingUser;
  };

  const register = async (userData) => {
    const usernameExists = await checkUsername(
      userData.username
    );

    if (usernameExists) {
      throw new Error("Username already exists");
    }

    const existingUsers = await getUserByEmail(
      userData.email
    );
    if (existingUsers.length > 0) {
      throw new Error("Email already registered");
    }

    const newUser = await createUser({
      ...userData,
      avatar: "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(userData.fullName),
      createdAt: new Date().toISOString()
    });

    localStorage.setItem("userId", newUser.id);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const checkUsername = async (username) => {
    const users = await getUserByUsername(username);
    return users.length > 0;
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }
    let isActive = true;
    getUserById(userId)
      .then((userData) => {
        if (isActive) {
          setUser(userData);
        }
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        if (error?.response?.status === 404) {
          localStorage.removeItem("userId");
        } else {
          console.error("Failed to restore the saved user session.", error);
        }
        setUser(null);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });
    return () => {
      isActive = false;
    };
  }, []);

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    checkUsername
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

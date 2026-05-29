import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { STORAGE_KEYS } from "@/constants";

type User = {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  shopCompleted?: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    userData: User,
    jwtToken: string
  ) => void;

  loginDemo: () => void;

  logout: () => void;
};

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] =
    useState<User | null>(
      null
    );

  const [token, setToken] =
    useState<string | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  /**
   * Restore Session
   */
  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem(
          STORAGE_KEYS.USER
        ) ??
        localStorage.getItem(
          "user"
        );

      const storedToken =
        localStorage.getItem(
          STORAGE_KEYS.AUTH_TOKEN
        ) ??
        localStorage.getItem(
          "token"
        );

      if (
        storedUser &&
        storedUser !==
          "undefined"
      ) {

        setUser(
          JSON.parse(
            storedUser
          )
        );
      }

      if (storedToken) {

        setToken(
          storedToken
        );
      }

    } catch (err) {

      console.error(
        "Failed to restore auth session:",
        err
      );

      localStorage.removeItem(
        STORAGE_KEYS.USER
      );

      localStorage.removeItem(
        STORAGE_KEYS.AUTH_TOKEN
      );
    }

    setLoading(false);

  }, []);

  /**
   * LOGIN
   */
  const login = (
    userData: User,
    jwtToken: string
  ) => {

    setUser(userData);

    setToken(jwtToken);

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(
        userData
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.AUTH_TOKEN,
      jwtToken
    );
  };

  /**
   * DEMO LOGIN
   */
  const loginDemo = () => {

    const demoUser: User = {
      id: "demo-user",
      name: "Demo User",
      email: "demo@kirana.local",
      shopCompleted: true,
    };

    const demoToken = "demo-session";

    setUser(demoUser);

    setToken(demoToken);

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(
        demoUser
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.AUTH_TOKEN,
      demoToken
    );
  };

  /**
   * LOGOUT
   */
  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem(
      STORAGE_KEYS.USER
    );

    localStorage.removeItem(
      STORAGE_KEYS.AUTH_TOKEN
    );
  };

  const isAuthenticated =
    !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        loginDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext =
  () => {

    const context =
      useContext(
        AuthContext
      );

    if (!context) {

      throw new Error(
        "useAuthContext must be used within AuthProvider"
      );
    }

    return context;
  };

import { jwtDecode } from "jwt-decode";
import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "UPDATE_USER": {
      return {
        user: {
          ...action.payload,
          token: action.payload.token || state.user?.token,
        },
      };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue) {
        try {
          const userData = JSON.parse(e.newValue);
          dispatch({ type: "UPDATE_USER", payload: userData });
        } catch (error) {
          console.error("Error processing storage change:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      try {
        const user = JSON.parse(userStr);

        if (user && user.token) {
          const decodedToken: any = jwtDecode(user.token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
          } else {
            dispatch({ type: "LOGIN", payload: user });
          }
        } else {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    }

    setLoading(false);
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

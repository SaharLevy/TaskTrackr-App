import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import * as user_api_functions from "../network/user_api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();
  const apiUrl = process.env.REACT_APP_API_URL || "/api";

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await user_api_functions.fetchData(
        `${apiUrl}/user/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();

      // save the user in local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...json.user, token: json.token })
      );
      console.log("Login response:", json);
      // Dispatch LOGIN action to update AuthContext
      dispatch({ type: "LOGIN", payload: { ...json.user, token: json.token } });

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { login, isLoading, error };
};

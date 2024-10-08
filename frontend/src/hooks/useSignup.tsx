import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { set } from "mongoose";
import User from "../types/user";
import * as user_api_functions from "../network/user_api";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();

  const signup = async (newUser: User) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await user_api_functions.fetchData("api/user/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const json = await response.json();

      // save the user in local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...json.user, token: json.token })
      );
      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { signup, isLoading, error };
};

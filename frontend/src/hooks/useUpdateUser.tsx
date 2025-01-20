import { useState } from "react";
import { updateUserRequest } from "../network/user_api";
import { useAuthContext } from "./useAuthContext";

const useUpdateUser = () => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    newFullName: string,
    newEmail: string,
    password: string
  ) => {
    setError(null);

    if (!user || !user.token || !user.email || !user._id) {
      setError("User is not authenticated. Please log in again.");
      return null;
    }

    if (!password) {
      setError("Password is required to update account details.");
      return null;
    }

    if (!newFullName && !newEmail) {
      setError(
        "Please provide at least one field to update (email or full name)."
      );
      return null;
    }

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        User: user._id,
      };

      const body = {
        newFullName: newFullName || user.fullName,
        newEmail: newEmail || user.email,
        oldEmail: user.email,
        password,
      };

      const response = await updateUserRequest(headers, body);

      if (response?.user) {
        const updatedUser = {
          ...response.user,
          token: user.token,
          fullName: newFullName || user.fullName,
          email: newEmail || user.email,
        };

        // Force synchronous updates
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch({ type: "UPDATE_USER", payload: updatedUser });

        return updatedUser;
      }

      return null;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unexpected error occurred."
      );
      return null;
    }
  };

  return { updateUser, error };
};

export default useUpdateUser;

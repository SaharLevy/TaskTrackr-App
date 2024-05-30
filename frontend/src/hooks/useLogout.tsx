import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      //remove token from local storage
      localStorage.removeItem("user");
      //redirect to login
      //window.location.href = "/login";
      dispatch({ type: "LOGOUT" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };
  return { logout };
};

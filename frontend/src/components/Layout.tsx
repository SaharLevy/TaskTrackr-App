import React, { ReactNode } from "react";
import MainNavBar from "../components/MainNavBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
};

export default Layout;

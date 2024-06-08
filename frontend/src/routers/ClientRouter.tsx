import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import TaskList from "../components/TaskList";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useAuthContext } from "../hooks/useAuthContext";
import Layout from "../components/Layout";

export const ClientRouter = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Layout>
                <TaskList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isLoggedIn ? (
              <Layout>
                <h1>ssssss</h1>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Layout>
                <Login />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <Layout>
                <Signup />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

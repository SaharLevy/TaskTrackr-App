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
import ProtectedRoute from "./ProtectedRoute";
import AccountPage from "../components/AccountPage";

export const ClientRouter = () => {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <TaskList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Layout>
                <h1>Tasks</h1>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            !user ? (
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
            !user ? (
              <Layout>
                <Signup />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Layout>
                <AccountPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

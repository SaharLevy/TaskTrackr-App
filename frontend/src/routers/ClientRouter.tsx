import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import TaskList from "../components/TaskList";
import Signup from "../components/Signup";

const Layout = ({ children, isAuthRoute }: any) => {
  const isLoggedIn = true; //TODO: check if user is logged in from session
  return (
    <>
      <MainNavBar />
      {isLoggedIn ? (
        <>
          {isAuthRoute && <TaskList />}
          {children}
        </>
      ) : (
        <h1>login page</h1>
      )}
    </>
  );
};

export const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <TaskList />
            </Layout>
          }
        />
        <Route
          path="/tasks"
          element={
            <Layout>
              <h1>ssssss</h1>
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout isAuthRoute={true}>
              <h1>login</h1>
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

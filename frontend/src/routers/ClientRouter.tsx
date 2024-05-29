import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import TaskList from "../components/TaskList";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Layout = ({ children, isAuthRoute }: any) => {
  const isLoggedIn = true; //TODO: check if user is logged in from session
  // isAuthRoute is a boolean that tells us if the route is an authentication route, ROUTE THAT DOES REQUIRE AUTHENTICATION
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
            <Layout>
              <Login />
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
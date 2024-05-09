import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import TaskList from "../components/TaskList";

const Layout = ({ children }: any) => {
  return (
    <>
      <MainNavBar />
      {children}
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
      </Routes>
    </Router>
  );
};

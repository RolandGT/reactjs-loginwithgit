import React from "react";
import SignIn from "./components/SignIn/SignIn";
import Welcome from "./components/Welcome/Welcome";
import NoSuchRoute from "./components/NoSuchRoute/NoSuchRoute";
//rolandas app routes
const routes = [
  { name: "signin", path: "/", exact: true, main: () => <SignIn /> },
  { name: "welcome", path: "/welcome", exact: true, main: () => <Welcome /> },
  { main: () => <NoSuchRoute /> },
];

export default routes;

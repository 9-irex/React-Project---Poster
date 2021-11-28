import React from "react";
import { ReactSession } from "react-client-session";

function Home() {
  // Set the session to localstorage
  ReactSession.setStoreType("localStorage");



  return <h1>Username</h1>;
}

export default Home;

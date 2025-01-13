import React from "react";
import styles from "./AdminPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  console.log(JSON.parse(localStorage.getItem("allAccounts")));
  console.log(JSON.parse(localStorage.getItem("isAdmin")));

  let allAccs = JSON.parse(localStorage.getItem("allAccounts")).allAccounts
    .length;

  const logOut = () => {
    localStorage.setItem("isAdmin", false);
    navigate("/login");
  }; // Clicking "LOG OUT"

  window.addEventListener("popstate", function () {
    logOut();
  }); // Clicking BACK BUTTON IN BROWSER

  if (JSON.parse(localStorage.getItem("isAdmin")) == true) {
    console.log("HI ADMIN");
    return (
      <>
        <div>{allAccs}</div>
        <button onClick={logOut}>Log out</button>
      </>
    );
  } else {
    return <div>Please Log In Again</div>;
  }
}

export default AdminPage;

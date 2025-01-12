import React from "react";
import styles from "./AdminPage.module.css";

function AdminPage() {
  console.log(JSON.parse(localStorage.getItem("allAccounts")));

  let allAccs = JSON.parse(localStorage.getItem("allAccounts")).allAccounts
    .length;
  return <div>{allAccs}</div>;
}

export default AdminPage;

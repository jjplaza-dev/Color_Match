import React from "react";
import styles from "./AdminPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  console.log(JSON.parse(localStorage.getItem("allAccounts")));

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
        <h1 className={styles.greetings}>Hello Admin, </h1>
        <section className={styles.statBoxMain}>
          <div className={styles.statBox1}>
            <div className={styles.totalAccountsRegistered}>
              Total Accounts: {allAccs}
            </div>
          </div>
          <div className={styles.statBox2}></div>
          <div className={styles.statBox3}></div>
          <div className={styles.statBox4}></div>
        </section>

        <button onClick={logOut}>Log out</button>
      </>
    );
  } else {
    navigate("/login");
    return <div>Please Log In Again</div>;
  }
}

export default AdminPage;

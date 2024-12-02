import React from "react";
import styles from "./LoginPage.module.css";
import RegisterPage from "./RegisterPage";

function LoginPage() {
  let registered = false;
  console.log(JSON.parse(localStorage.getItem("allAccounts")));
  const check = () => {
    console.log(
      JSON.parse(localStorage.getItem("allAccounts")).allAccounts[0].username
    );
    JSON.parse(localStorage.getItem("allAccounts")).allAccounts.forEach((e) => {
      if (document.getElementById("loginUsername").value == e.username) {
        registered = true;
        console.log("IN");
      } else {
        console.log("OUT");
      }
    });
    console.log(registered);
  };

  return (
    <section className={styles.LoginPage}>
      <div className={styles.loginPageBox}>
        <div className={styles.usernameBox}>
          <label>Username:</label>
          <br />
          <input id="loginUsername" />
        </div>
        <div className={styles.passwordBox}>
          <label>Password:</label>
          <br />
          <input id="loginPassword" type="password" />
        </div>
        <button className={styles.loginBtn} onClick={check}>
          <a>Login</a>
        </button>
        <button className={styles.registerBtn}>
          <a href="/register" style={{ textDecoration: "none" }}>
            don't have an account yet?{" "}
          </a>
          <a href="/register">Register</a>
        </button>
      </div>
    </section>
  );
}

export default LoginPage;

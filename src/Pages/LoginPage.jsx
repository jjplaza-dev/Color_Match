import React from "react";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div>
      <button style={styles.loginBtn}>
        <a href="/main">Login</a>
      </button>
      <button style={styles.registerBtn}>
        <a href="/register">Register</a>
      </button>
    </div>
  );
}

export default LoginPage;

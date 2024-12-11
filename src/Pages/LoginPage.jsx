import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import RegisterPage from "./RegisterPage";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(true);

  console.log(JSON.parse(localStorage.getItem("allAccounts")));
  const check = () => {
    console.log(
      JSON.parse(localStorage.getItem("allAccounts")).allAccounts[0].username
    );
    JSON.parse(localStorage.getItem("allAccounts")).allAccounts.forEach((e) => {
      if (document.getElementById("loginUsername").value == e.username) {
        setRegistered(true);

        console.log(registered);
        navigate("/main");
      } else {
        setRegistered(false);
        console.log(registered);
      }
    });
    console.log(registered);
  };

  return (
    <section className={styles.LoginPage}>
      <div className={styles.loginPageBox}>
        <div className={styles.usernameBox}>
          <label>Username</label>
          <br />
          <input id="loginUsername" />{" "}
          <UnregisteredPopUp isRegistered={registered} />
        </div>
        <div className={styles.passwordBox}>
          <label>Password</label>
          <br />
          <input id="loginPassword" type="password" />
        </div>
        <button className={styles.loginBtn} onClick={check}>
          <a>Login</a>
        </button>
        <button className={styles.registerBtn}>
          <a href="/register" style={{ textDecoration: "none" }}>
            Don't have an account yet?{" "}
          </a>
          <a href="/register">Register</a>
        </button>
      </div>
    </section>
  );
}

const UnregisteredPopUp = ({ isRegistered }) => {
  if (!isRegistered) {
    return <div className={styles.unregisterPopUp}>No Account Detected</div>;
  }
};

export default LoginPage;

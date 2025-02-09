import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import RegisterPage from "./RegisterPage";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(true);

  console.log(JSON.parse(localStorage.getItem("allAccounts")));

  const check = (loginUser, loginPass) => {
    JSON.parse(localStorage.getItem("allAccounts")).allAccounts.forEach((e) => {
      if (loginUser == e.username && loginPass === e.password) {
        setRegistered(true);
        if (e.username == "admin") {
          localStorage.setItem("isAdmin", true);
          navigate("/admin");
        } else {
          localStorage.setItem("currentUserPin", e.userPin);
          navigate("/main");
        }
      } else {
        setRegistered(false);
      }
    });
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
          <input
            id="loginPassword"
            type="password"
            onKeyDown={() => {
              if (event.key === "Enter") {
                // TYPING in input field then pressing Enter
                check(
                  document.getElementById("loginUsername").value,
                  document.getElementById("loginPassword").value
                );
              }
            }}
          />
        </div>
        <button
          className={styles.loginBtn}
          onClick={() =>
            check(
              document.getElementById("loginUsername").value,
              document.getElementById("loginPassword").value
            )
          }
        >
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

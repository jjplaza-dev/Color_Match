import React from "react";
import { useState, useEffect } from "react";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [allAccounts, setAllAccounts] = useState([]);
  const [registerAcc, setRegisterAcc] = useState("");

  const persistData = (thisAcc) => {
    localStorage.setItem(
      "allAccounts",
      JSON.stringify({ allAccounts: thisAcc })
    );
  };

  const registerAccount = (user, pass) => {
    const newAccs = [...allAccounts, { username: user, password: pass }];
    setRegisterAcc((registerAcc) => [
      ...registerAcc,
      {
        user: user,
        pass: pass,
      },
    ]);
    persistData(newAccs);
    console.log(JSON.parse(localStorage.getItem("allAccounts")));
  };
  console.log(registerAcc);

  const resetAll = () => {
    setRegisterAcc("");
    localStorage.setItem("allAccounts", "");
  };

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos = localStorage.getItem("allAccounts");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).allAccounts;
    setAllAccounts(localTodos);
  }, []);

  return (
    <>
      <section className={styles.RegisterPage}>
        <div className={styles.registerPageBox}>
          <div className={styles.usernameBox}>
            <label>Username:</label>
            <br />
            <input id="usernameInput" />
          </div>
          <div className={styles.passwordBox}>
            <label>Password:</label>
            <br />
            <input id="passwordInput" type="password" />
          </div>

          <button
            onClick={() =>
              registerAccount(
                document.getElementById("usernameInput").value,
                document.getElementById("passwordInput").value
              )
            }
            className={styles.registerBtn}
          >
            Register
          </button>

          <button className={styles.loginBtn}>
            <a href="/login" style={{ textDecoration: "none" }}>
              already have an account?
            </a>
            <a href="/login">Login</a>
          </button>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;

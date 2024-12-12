import React from "react";
import { useState, useEffect } from "react";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [allAccounts, setAllAccounts] = useState([]);
  const [registerAcc, setRegisterAcc] = useState("");
  const [passwordExist, setPasswordExist] = useState(true);

  const persistData = (thisAcc) => {
    localStorage.setItem(
      "allAccounts",
      JSON.stringify({ allAccounts: thisAcc })
    );
  };

  const registerAccount = (user, pass) => {
    if (user.trim() === "" || pass.trim() === "") {
      console.log("Password or Username is Empty");
      if (pass.trim() === "") {
        setPasswordExist(false);
      }
    } else {
      setPasswordExist(true);
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
    }
  };
  console.log(registerAcc);

  const resetAll = () => {
    setRegisterAcc("");
    localStorage.setItem("allAccounts", "");
  };

  const clearAccounts = () => {
    localStorage.clear();
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
            <label>Username</label>
            <br />
            <input id="usernameInput" />
          </div>
          <div className={styles.passwordBox}>
            <label>Password</label>
            <br />
            <input id="passwordInput" type="password" />
            <NoPassword isPasswordInputEmpty={!passwordExist} />
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
              Already have an account?{" "}
            </a>
            <a href="/login">Login</a>
          </button>
          <button onClick={clearAccounts}>Reset</button>
        </div>
      </section>
    </>
  );
}

const NoPassword = ({ isPasswordInputEmpty }) => {
  if (isPasswordInputEmpty) {
    return <div className={styles.noPasswordPopUp}> No Password Detected</div>;
  }
};

export default RegisterPage;

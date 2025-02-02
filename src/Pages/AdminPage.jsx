import React from "react";
import styles from "./AdminPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminPage() {
  const navigate = useNavigate();
  console.log(JSON.parse(localStorage.getItem("allAccounts")));
  console.log(JSON.parse(localStorage.getItem("userProgressData")));

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
    // Local Time ----------------------------------

    const [localTime, setLocalTime] = useState("");

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        // Format time as HH:MM:SS AM/PM
        const formattedTime = now.toLocaleTimeString();
        setLocalTime(formattedTime);
      };

      updateTime(); // Set initial time
      const intervalId = setInterval(updateTime, 1000); // Update time every second

      return () => clearInterval(intervalId); // Cleanup interval
    }, []);

    // Search for a player's PIN and Progress
    const [searchPin, setSearchPin] = useState("");
    const userProgressData =
      JSON.parse(localStorage.getItem("userProgressData")) || [];
    const playerPin = Object.values(userProgressData)
      .map((item) => item.pin)
      .map((num) => num.toString());

    const filteredPin = playerPin.filter((playerPin) =>
      playerPin.toLowerCase().includes(searchPin.toLowerCase())
    ); // Player Pin ----------------------------

    const playerProgress = (thisPin) => {
      return userProgressData.find((item) => item.pin == thisPin).completedBox;
    }; // Player Progress -----------------------

    const clearAccounts = () => {
      localStorage.clear();
      localStorage.setItem("userProgressData", 0);
    };

    return (
      <>
        <h1 className={styles.greetings}>Hello Admin, </h1>
        <section className={styles.statBoxMain}>
          <div className={styles.statBox1}>
            <p>{localTime}</p>
            <div className={styles.totalAccountsRegistered}>
              Total Accounts: {allAccs}
            </div>
          </div>
          <div className={styles.statBox2}>
            <section className={styles.searchPlayerPinBox}>
              <div className={styles.searchPlayerPinInput}>
                <input
                  type="text"
                  placeholder="Search Player Pin"
                  value={searchPin}
                  onChange={(e) => setSearchPin(e.target.value)}
                />
                <button onClick={clearAccounts}>-- Delete All --</button>
              </div>
              <div className={styles.searchPlayerPinResult}>
                {searchPin && (
                  <ul>
                    {filteredPin.length > 0 ? (
                      filteredPin.map((playerPin) => (
                        <ul key={playerPin}>
                          {" "}
                          Pin: {playerPin} | Completed Boxes:{" "}
                          {playerProgress(playerPin)}
                        </ul>
                      ))
                    ) : (
                      <ul>No matches found</ul>
                    )}
                  </ul>
                )}
              </div>
            </section>
          </div>
          <div className={styles.statBox3}>3</div>
          <div className={styles.statBox4}>4</div>
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

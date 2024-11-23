import React from "react";
import styles from "./ColorQueue.module.css";

function ColorQueue(props) {
  return (
    <>
      <div className={styles.colorQueue} id="colorQueue">
        {props.colorArr.map((e) => {
          return (
            <>
              <div style={{ backgroundColor: `${e}` }}></div>
              {"=>"}
            </>
          );
        })}
      </div>
    </>
  );
}

export default ColorQueue;

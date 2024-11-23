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
              <div className={styles.arrows}>
                <svg
                  width="54"
                  height="38"
                  viewBox="0 0 54 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52.7014 20.7678C53.6777 19.7915 53.6777 18.2085 52.7014 17.2322L36.7915 1.32233C35.8151 0.34602 34.2322 0.34602 33.2559 1.32233C32.2796 2.29864 32.2796 3.88155 33.2559 4.85786L47.3981 19L33.2559 33.1421C32.2796 34.1184 32.2796 35.7014 33.2559 36.6777C34.2322 37.654 35.8151 37.654 36.7915 36.6777L52.7014 20.7678ZM0.933594 21.5H50.9336V16.5H0.933594V21.5Z"
                    fill="black"
                  />
                </svg>
              </div>
            </>
          );
        })}
        {<div style={{ backgroundColor: `${props.colorArr[0]}` }}></div>}
      </div>
    </>
  );
}

export default ColorQueue;

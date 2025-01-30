import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.css";
import ColorQueue from "../Components/ColorQueue";
import { v4 as uuid } from "uuid";

function MainContent() {
  const [colorArr, setColorArr] = useState(["green", "blue", "red", "yellow"]);
  const [allPins, setAllPins] = useState([]);

  // Retrieve user progress data and current user pin from localStorage -----------
  const userProgressData =
    JSON.parse(localStorage.getItem("userProgressData")) || [];
  const currentUserPin = JSON.parse(localStorage.getItem("currentUserPin"));

  // Check if currentUserPin is not already in userProgressData -----------------
  if (!userProgressData.some((item) => item.pin === currentUserPin)) {
    // Create an object with currentUserPin, completedBox, and timeToFinish -----
    const newProgressEntry = {
      pin: currentUserPin,
      completedBox: 0,
      timeToFinish: null,
    };

    // Push the new progress entry to userProgressData ------------------------
    userProgressData.push(newProgressEntry);

    // Update localStorage with the new userProgressData -----------------------
    localStorage.setItem("userProgressData", JSON.stringify(userProgressData));
  }

  // Find the object corresponding to the currentUserPin --------------------

  const currentUserProgress = userProgressData.find(
    (item) => item.pin === currentUserPin
  );

  if (currentUserProgress) {
    console.log("Current User Progress:", currentUserProgress);
  } else {
    console.log("No progress found for this user pin.");
  }

  const completeBox = () => {
    currentUserProgress.completedBox += 1;
    localStorage.setItem("userProgressData", JSON.stringify(userProgressData));
    console.log("Current User Progress:", currentUserProgress);
  };

  // Shuffles colorArr ------------------------------------------------------------

  function shuffleArray(colorArr) {
    for (let i = colorArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorArr[i], colorArr[j]] = [colorArr[j], colorArr[i]];
    }
    return colorArr;
  }

  useEffect(() => {
    setAllPins(localStorage.getItem("userPins"));
    shuffleArray(colorArr); // Execute shuffle once
  }, []);

  // Adds a box --------------------------------------------------------------

  const [boxes, setBoxes] = useState([]);

  const addBoxes = () => {
    setBoxes((oldBoxes) => [
      ...oldBoxes,
      {
        id: uuid(),
        bgColor: Math.floor(Math.random() * colorArr.length),
      },
    ]);
  };

  const changeColor = (id, bgColor) => {
    setBoxes((oldBox) =>
      oldBox.map((box) =>
        box.id === id
          ? {
              ...box,
              bgColor: (box.bgColor + 1) % colorArr.length,
            }
          : box
      )
    );
  };

  const [allColorsSame, setAllColorsSame] = useState(false);

  // Adds all boxes --------------------------------------------------------------

  useEffect(() => {
    if (boxes.length < 25) {
      addBoxes();
    }

    // Checks if all boxes have the same color ------------------------------------

    if (boxes.length > 0) {
      const firstColor = boxes[0].bgColor;
      let checkedSquares;
      let allSame = true;

      document.getElementById("gameStatus").innerText = "Congrats";

      for (let i = 1; i < boxes.length; i++) {
        if (boxes[i].bgColor !== firstColor) {
          allSame = false;
          document.getElementById("gameStatus").innerText = " ";
        }
        checkedSquares = i;
      }
      setAllColorsSame(allSame);
      if (allColorsSame == true && checkedSquares == 24) {
        console.log("DONEZO");
        completeBox();
      }
    }
  });

  /********************************************************/

  const [output, setOutput] = useState();
  const [outputArr, setOutputArr] = useState();

  const updateOutput = () => {
    setOutput(document.getElementById("inputHere").value);
  };

  return (
    <div className={styles.testDivBox}>
      <div className={styles.testProper}>
        <h4 id="gameStatus">sure</h4>
        {<ColorQueue colorArr={colorArr} />}
        <div className={styles.mainColorBox} key={123} id="mainColorBox">
          {boxes.map((e) => (
            <div
              onClick={() => changeColor(e.id, e.bgColor)}
              key={uuid()}
              style={{ backgroundColor: `${colorArr[e.bgColor]}` }}
            ></div>
          ))}
        </div>

        <div className={styles.buttonsBox}>
          <input onChange={updateOutput} id="inputHere" />
          <p id="outputHere">{output}</p>

          <p>Pin: {currentUserProgress.pin}</p>
          <p>Completed Boxes: {currentUserProgress.completedBox}</p>
          <button>
            <a href="/main">Reset</a>
          </button>

          <div>{outputArr}</div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;

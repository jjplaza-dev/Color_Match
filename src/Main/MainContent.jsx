import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.css";
import ColorQueue from "../Components/ColorQueue";
import { v4 as uuid } from "uuid";

function MainContent() {
  const [colorArr, setColorArr] = useState(["green", "blue", "red", "yellow"]);

  // Shuffles colorArr --------------------------------------------------------------------

  function shuffleArray(colorArr) {
    for (let i = colorArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorArr[i], colorArr[j]] = [colorArr[j], colorArr[i]];
    }
    return colorArr;
  }

  useEffect(() => {
    shuffleArray(colorArr); // Execute shuffle once
  }, []);

  // ---------------------------------------------------------------------------------------

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

  const [allColorsSame, setAllColorsSame] = useState(true);

  useEffect(() => {
    if (boxes.length < 25) {
      addBoxes();
    }
    if (boxes.length > 0) {
      const firstColor = boxes[0].bgColor;
      let allSame = true;
      document.getElementById("gameStatus").innerText = "Congrats";
      for (let i = 1; i < boxes.length; i++) {
        if (boxes[i].bgColor !== firstColor) {
          allSame = false;
          document.getElementById("gameStatus").innerText = " ";
        }
      }
      setAllColorsSame(allSame);
    }
  }, [boxes]);

  /********************************************************/

  const [output, setOutput] = useState();
  const [outputArr, setOutputArr] = useState();

  const updateOutput = () => {
    setOutput(document.getElementById("inputHere").value);
  };
  const addInput = () => {
    setOutputArr((...allInput) => [
      ...allInput,
      " | ",
      document.getElementById("inputHere").value,
    ]);
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
          <button onClick={addInput}>add</button>
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

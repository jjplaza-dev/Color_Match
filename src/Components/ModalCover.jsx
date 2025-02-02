import React from "react";
import styles from "./ModalCover.module.css";

function ModalCover(visible) {
  if (visible) {
    return <div>ModalCover</div>;
  } else {
    return;
  }
}

export default ModalCover;

import React from "react";

function RegisterPage() {
  const registerAccount = () => {
    console.log(document.getElementById("usernameInput").value);
  };
  return (
    <>
      <label>Username: </label>
      <input id="usernameInput" />
      <label>Password: </label>
      <input type="password" />
      <a href="/">already have an account?</a>
      <button onClick={registerAccount}>Register</button>
    </>
  );
}

export default RegisterPage;

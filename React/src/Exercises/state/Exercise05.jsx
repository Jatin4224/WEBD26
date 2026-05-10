/*
Two-Factor Authentication
Two-factor authentication has quickly become a best practice in terms of securing logins for highly-sensitive accounts. The most common form I've seen is that the user is prompted to enter a short code, generated from an app.


In this exercise, we'll build this form!

Acceptance Criteria:

The input's value should be held in React state.
When the user submits their code, a window.alert should let them know whether it's correct or not, by comparing their submitted value with the CORRECT_CODE constant.
A <form> tag should be used.



*/
import React, { useState } from "react";

const CORRECT_CODE = "123456";

function Exercise05() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_CODE) {
      window.alert("correct code");
    } else {
      window.alert("incorrect code");
    }
  };
  return (
    <>
      <form onClick={handleSubmit}>
        <label htmlFor="auth-code">Enter authorization code:</label>
        <div className="row">
          <input
            id="auth-code"
            type="text"
            required={true}
            maxLength={6}
            className="text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button>Validate</button>
          <h1> {input}</h1>
        </div>
      </form>
    </>
  );
}

export default Exercise05;

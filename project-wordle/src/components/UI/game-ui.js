/*
Acceptance Criteria:

Create a new component.
Don't forget, you can use an NPM script to generate the scaffolding for you! We learn how to do this in the “Getting Started” video
This component should render a <form> tag, including a label and a text input.
The text input should be controlled by React state.
When the form is submitted:
The entered value should be logged to the console (for now).
The input should be reset to an empty string.
The user's input should be converted to ALL UPPERCASE. No lower-case letters allowed.
The input should have a minimum and maximum length of 5.
NOTE: The minLength validator is a bit funky; you may wish to use the pattern attribute instead. This is discussed in more detail on the Solution page.


*/

import React, { useState } from "react";

const GameUI = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setHistory([...history, input]);

    setInput("");
  };

  return (
    <>
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="guess-input">Enter guess:</label>

        <input
          required
          minLength={5}
          maxLength={5}
          id="guess-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
        />

        <button type="submit">Submit</button>

        <div className="guess-results">
          {history.map((input, index) => (
            <p key={index} className="guess">
              <div class="guess-results">
                <p class="guess">
                  <span class="cell">{input[0]}</span>
                  <span class="cell">{input[1]}</span>
                  <span class="cell">{input[2]}</span>
                  <span class="cell">{input[3]}</span>
                  <span class="cell">{input[4]}</span>
                </p>
              </div>
            </p>
          ))}
        </div>
      </form>
    </>
  );
};

export default GameUI;

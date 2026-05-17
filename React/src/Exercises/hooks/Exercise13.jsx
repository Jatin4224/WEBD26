/*
Locally-persisted state
Let's suppose we're building an application with a “Dark Mode” toggle.

It would be really annoying if users had to keep toggling their preferred mode every time they load our application!

Let's update the code below so that the user's preference is saved in localStorage, and restored when the page loads.

In other words, the current value of isDarkMode should be "remembered", and used when the page is refreshed:

We can do this in plain JS with the following code:

// Save the value:
window.localStorage.setItem('is-dark-mode', true);

// Retrieve the value:
window.localStorage.getItem('is-dark-mode');
Acceptance Criteria:

The value of isDarkMode should be saved in localStorage whenever it changes, using the useEffect hook.
The initial value of the isDarkMode state variable should be retrieved from localStorage (or set to false if no value has been saved).
You can use the string "is-dark-mode" for the key.
Note: Items saved to localStorage are always saved as a string. You'll need to convert the stored value back to boolean. You can do this with JSON.parse().


*/
/*
Local Storage cheatsheet:

// To save an item:
window.localStorage.setItem('is-dark-mode', true);

// To retrieve the value:
JSON.parse(window.localStorage.getItem('is-dark-mode'));
*/

import React, { useEffect } from "react";

import Toggle from "./Toggle";

function IsDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    //solution - part 2 getting intial value
    const storedValue = window.localStorage.getItem("is-dark-mode");
    //local storage is only capable of sotring strings , i need boolean
    const parsedValue = JSON.parse(storedValue) || false;
  });

  //solution - part 1 setting into storage
  useEffect(() => {
    window.localStorage.setItem("is-dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    // Retrieve the value:
    window.localStorage.getItem("is-dark-mode");
  }, []);
  return (
    <div
      className="wrapper"
      style={{
        // NOTE: This is a just-for-fun mini demo, not a
        // full-featured Dark Mode implementation!
        "--color-bg": isDarkMode ? "black" : "white",
        "--color-text": isDarkMode ? "white" : "black",
      }}
    >
      <Toggle
        label="Dark Mode"
        checked={isDarkMode}
        handleToggle={setIsDarkMode}
      />
    </div>
  );
}

export default IsDarkMode;

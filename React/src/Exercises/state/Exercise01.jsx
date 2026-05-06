import React from "react";

function Exercise01() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>You've clicked {count} times.</p>
      <button
        onClick={() => {
          const nextCount = count + 1;
          setCount(nextCount);

          console.log(nextCount);
        }}
      >
        Click me!
      </button>
    </>
  );
}

export default Exercise01;

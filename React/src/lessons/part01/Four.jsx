import React, { useState } from "react";

const Four = () => {
  const [count, setCount] = useState(2);
  //   const value = 5;

  const increase = () => {
    setCount(count + 1); //Not so Good
  };
  return (
    <div className="text-white">
      <h1>Value: {count}</h1>
      <button onClick={increase}>kar click</button>
    </div>
  );
};

export default Four;

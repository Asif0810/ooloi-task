import React, { useState } from "react";

const Speaker = () => {
  const [count, setCount] = useState([]);
  const handleadd = () => {
    const abc = [...count, []];
    setCount(abc);
  };
  const handlecount = () => {};
  return (
    <div>
      <button onClick={() => handleadd()}>add</button>
      {count.map((data, i) => {
        return <input onChange={(e) => handlecount(e, i)} type="text" />;
      })}
    </div>
  );
};

export default Speaker;

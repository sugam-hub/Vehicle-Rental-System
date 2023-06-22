import React, { useState } from "react";

const SingleField = () => {
  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("Sugam");

  return (
    <>
      <form>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
      <button
        onClick={() => {
          setValue(newValue);
        }}
      >
        OK
      </button>
    </>
  );
};

export default SingleField;

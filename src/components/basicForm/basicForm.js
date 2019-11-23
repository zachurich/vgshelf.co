import React from "react";

export const BasicForm = ({ inputName, value, handleChange, handleSubmit }) => {
  return (
    <form className="basic-form" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="" htmlFor={`${inputName.toLowerCase()}-title`}>
        {inputName}
      </label>
      <input
        className=""
        name={`${inputName.toLowerCase()}-title`}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

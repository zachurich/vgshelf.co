import React from "react";

export const BasicForm = ({ inputName, value, handleChange, handleSubmit }) => {
  return (
    <form className="mb-6 w-full" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="block mb-2" htmlFor={`${inputName.toLowerCase()}-title`}>
        {inputName}
      </label>
      <input
        className="shadow rounded w-full appearance-none border py-2 px-3 leading-tight text-base"
        name={`${inputName.toLowerCase()}-title`}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

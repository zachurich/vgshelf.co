import React from "react";

import "./styles.scss";

export const BasicForm = ({
  inputName,
  placeholder,
  value,
  handleChange,
  handleSubmit
}) => {
  return (
    <form className="basic-form" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="basic-form-label" htmlFor={`${inputName.toLowerCase()}-title`}>
        {inputName}
      </label>
      <input
        className="basic-form-input"
        name={`${inputName.toLowerCase()}-title`}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

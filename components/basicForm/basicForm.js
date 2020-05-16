import React from "react";
import FormControls from "../formControls/formControls";

export const BasicForm = ({
  inputName,
  placeholder,
  handleSubmit,
  handleDismiss,
  closeText,
  submitText,
}) => {
  const [displayValue, setDisplayValue] = React.useState("");
  const handleChange = (e) => {
    let value = e.target.value;
    setDisplayValue(() => value);
  };
  return (
    <form
      className="basic-form"
      onChange={handleChange}
      onSubmit={() => handleSubmit(displayValue)}
    >
      <input
        className="basic-form-input"
        name={`${inputName.toLowerCase()}-title`}
        placeholder={placeholder}
        type="text"
        value={displayValue}
        onChange={handleChange}
      />
      <FormControls
        handleDismiss={handleDismiss}
        closeText={closeText}
        disabled={!displayValue}
        submitText={submitText}
        handleSubmit={() => handleSubmit(displayValue)}
      />
    </form>
  );
};

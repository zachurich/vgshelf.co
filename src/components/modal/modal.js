import React from "react";
import { CSSTransition } from "react-transition-group";
import Router from "next/router";

import "./modal.scss";

const Modal = ({
  open = false,
  closeText = "Close",
  submitText = "Submit",
  dismissModal = e => e.preventDefault(),
  handleSubmit,
  message,
  children
}) => {
  const [selection, setSelection] = React.useState(null);
  const [displayValue, setDisplayValue] = React.useState("");
  const handleChange = (e, { newValue } = {}) => {
    // autosuggest provides arg2 {newValue} on the onChange event
    let value = newValue || e.target.value;
    console.log(value);
    setDisplayValue(() => value);
  };
  const handleSelectValue = (e, { suggestion }) => {
    setSelection(() => suggestion);
  };

  const handleClearValues = () => {
    setSelection(() => "");
    setDisplayValue(() => "");
  };

  const handleDismiss = () => {
    handleClearValues();
    dismissModal();
  };

  const handleSubmitAndClear = e => {
    e.preventDefault();
    if (selection) {
      handleSubmit(selection);
    } else {
      handleSubmit(displayValue);
    }
    handleClearValues();
  };
  const hydratedChildren = React.cloneElement(children, {
    displayValue,
    handleChange,
    handleSelectValue,
    handleSubmit: handleSubmitAndClear
  });
  return (
    <div>
      {open && (
        <section className="modal">
          <p>{message}</p>
          <div className="modal-container">
            {hydratedChildren}
            <div className="modal-footer">
              <div className="button">
                <a onClick={handleDismiss}>{closeText}</a>
              </div>
              <div className="modal-submit button submit">
                <a onClick={handleSubmitAndClear}>{submitText}</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Modal;

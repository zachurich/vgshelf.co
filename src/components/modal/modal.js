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
  const containerRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const [selection, setSelection] = React.useState(null);
  const [displayValue, setDisplayValue] = React.useState("");
  const handleChange = (e, { newValue } = {}) => {
    // autosuggest provides arg2 {newValue} on the onChange event
    let value = newValue || e.target.value;
    console.log(value);
    setDisplayValue(() => value);
  };
  const handleSelectValue = suggestion => {
    console.log(suggestion);
    setSelection(() => suggestion);
  };

  const handleClearValues = () => {
    setSelection(() => "");
    setDisplayValue(() => "");
  };

  const handleDismiss = e => {
    const target = e.target;
    if (target === containerRef.current || target === closeRef.current) {
      handleClearValues();
      dismissModal();
    }
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
        <section ref={containerRef} className="modal" onClick={handleDismiss}>
          <div className="modal-container">
            <div className="modal-content">
              {message ? (
                <p className="modal-error-message">{message}</p>
              ) : (
                hydratedChildren
              )}
            </div>
            <div className="modal-footer">
              <div>
                <a
                  ref={closeRef}
                  className="button button-secondary"
                  onClick={handleDismiss}
                >
                  {closeText}
                </a>
              </div>
              <div className="modal-submit submit">
                <a
                  className={`button button-primary ${!(selection || displayValue) &&
                    "disabled"}`}
                  onClick={handleSubmitAndClear}
                >
                  {submitText}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Modal;

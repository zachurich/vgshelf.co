import React from "react";
import "./styles.scss";

function FormControls({ handleDismiss, closeText, disabled, submitText, handleSubmit }) {
  return (
    <div className="form-controls action-group">
      <a className="form-close button button-secondary" onClick={handleDismiss}>
        {closeText}
      </a>
      <a
        className={`form-submit submit button button-primary ${
          disabled ? "disabled" : ""
        }`}
        onClick={handleSubmit}
      >
        {submitText}
      </a>
    </div>
  );
}

export default FormControls;

import React from "react";
import "./styles.scss";

function FormControls({ handleDismiss, closeText, disabled, submitText, handleSubmit }) {
  return (
    <div className="form-controls">
      <div>
        <a className="form-close button button-secondary" onClick={handleDismiss}>
          {closeText}
        </a>
      </div>
      <div className="form-submit submit">
        <a
          className={`button button-primary ${disabled ? "disabled" : ""}`}
          onClick={handleSubmit}
        >
          {submitText}
        </a>
      </div>
    </div>
  );
}

export default FormControls;

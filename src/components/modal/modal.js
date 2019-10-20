import React from "react";
import { CSSTransition } from "react-transition-group";
import Router from "next/router";

import "./modal.css";

const Modal = ({
  open = false,
  closeText = "Close",
  submitText = "Submit",
  dismissModal = e => e.preventDefault(),
  handleSubmit,
  children
}) => {
  return (
    <div>
      {open && (
        <section className="modal">
          <div className="modal-container rounded-lg p-10">
            {children}
            <div className="modal-footer py-2">
              <div className="button">
                <a onClick={() => dismissModal(false)}>{closeText}</a>
              </div>
              <div className="modal-submit button submit">
                <a onClick={handleSubmit}>{submitText}</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Modal;

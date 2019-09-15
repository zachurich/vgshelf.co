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
          <div className="modal-container rounded-lg p-10 w-4/5">
            {children}
            <div className="modal-footer">
              <div className="modal-close">
                <a onClick={() => dismissModal(false)}>{closeText}</a>
              </div>
              <div className="modal-submit">
                <button onClick={handleSubmit}>{submitText}</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Modal;

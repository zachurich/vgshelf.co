import React from "react";
import { CSSTransition } from "react-transition-group";
import Router from "next/router";

import "./modal.scss";

const Modal = ({
  open = false,
  dismissModal = e => e.preventDefault(),
  message,
  children
}) => {
  const containerRef = React.useRef(null);
  if (!open) return null;
  return (
    <div className="modal-wrapper">
      <section
        ref={containerRef}
        className="modal"
        onClick={e => {
          const target = e.target;
          if (target === containerRef.current) {
            dismissModal();
          }
        }}
      >
        <div className="modal-container">
          <div className="modal-content">
            {message ? <p className="modal-error-message">{message}</p> : children}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modal;

import React, { useRef } from "react";

import "./modal.scss";

const Modal = ({ open = false, dismissModal = () => {}, message, children }) => {
  const containerRef = useRef(null);
  if (!open) return null;
  return (
    <div className="modal-wrapper">
      <section
        ref={containerRef}
        className="modal"
        onClick={e => {
          const target = e.target;
          if (target === containerRef.current) {
            console.log(containerRef.current, target);
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

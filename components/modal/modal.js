import React, { useRef } from "react";

import CloseSVG from "../../assets/close.svg";
import { ButtonAction, ButtonToggle } from "../buttons/buttons";

const Modal = ({
  open = false,
  dismissModal = () => {},
  submitModal = () => {},
  header = null,
  message = null,
  content = () => <div />,
  footer = () => <div />,
}) => {
  const containerRef = useRef(null);
  if (!open) return null;
  return (
    <div className="modal-wrapper">
      <section
        ref={containerRef}
        className="modal"
        onClick={(e) => {
          const target = e.target;
          if (target === containerRef.current) {
            dismissModal();
          }
        }}
      >
        <div className="modal-container">
          <div className="modal-header">
            <h3>{header}</h3>
            <ButtonAction
              additionalClasses={"modal-header-close button-close"}
              handleAction={() => dismissModal()}
            >
              <CloseSVG />
            </ButtonAction>
          </div>
          <div className="modal-content">
            {message ? <p className="modal-error-message">{message}</p> : content()}
          </div>
          <div className="modal-footer">{footer()}</div>
        </div>
      </section>
    </div>
  );
};

export default Modal;

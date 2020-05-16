import React, { useRef } from "react";
import { ButtonToggle, ButtonAction } from "../buttons/buttons";
import CloseSVG from "../../assets/close.svg";

const Modal = ({
  open = false,
  dismissModal = () => {},
  header = null,
  message = null,
  children,
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
            {message ? <p className="modal-error-message">{message}</p> : children}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modal;

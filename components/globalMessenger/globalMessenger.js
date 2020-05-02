import _ from "lodash";
import React, { useState } from "react";
import GlobalMessageContext from "../../contexts/globalMessage";
import Modal from "../modal/modal";
import useModal from "../../common/hooks/useModal";
import Router from "next/router";

function GlobalMessanger({ children }) {
  const [shouldReload, setShouldReload] = useState(false);
  const { showModal, setShowModal, modalContent, setModalContent } = useModal();

  const promptMessage = ({ header, message }, reloadOnDismiss = false) => {
    if (reloadOnDismiss) {
      setShouldReload(reloadOnDismiss);
    }
    setModalContent({
      header,
      component: <p>{message}</p>
    });
    setShowModal(true);
  };

  const dismissMessage = () => {
    setShowModal(false);
    setModalContent({
      header: "",
      component: ""
    });
    if (shouldReload) {
      window.location.reload();
    }
  };

  return (
    <GlobalMessageContext.Provider value={{ promptMessage }}>
      {children}
      <Modal
        open={showModal}
        header={modalContent.header}
        message={modalContent.component}
        dismissModal={dismissMessage}
      />
    </GlobalMessageContext.Provider>
  );
}

export default GlobalMessanger;

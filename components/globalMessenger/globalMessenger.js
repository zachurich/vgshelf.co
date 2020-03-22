import React, { useState } from "react";
import GlobalMessageContext from "../../contexts/globalMessage";
import Modal from "../modal/modal";

function GlobalMessanger({ children }) {
  const [message, setMessage] = useState("Hello");
  const [visible, setVisible] = useState(false);

  const promptMessage = message => {
    setMessage(message);
    setVisible(true);
  };

  const dismissMessage = () => {
    setVisible(false);
    setMessage("");
  };

  return (
    <GlobalMessageContext.Provider
      value={{
        message,
        setMessage,
        promptMessage,
        dismissMessage
      }}
    >
      {children}
      <Modal open={visible} message={message} dismissModal={dismissMessage} />
    </GlobalMessageContext.Provider>
  );
}

export default GlobalMessanger;

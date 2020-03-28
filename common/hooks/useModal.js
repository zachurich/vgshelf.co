import { useState } from "react";

export const MODAL_DEFAULT = {
  header: "Default",
  component: <p>Content</p>
};

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(MODAL_DEFAULT);

  const createModalContent = (header, component) => {
    setModalContent(() => ({
      header,
      component
    }));
  };

  return {
    showModal,
    setShowModal,
    modalContent,
    setModalContent
  };
};

export default useModal;

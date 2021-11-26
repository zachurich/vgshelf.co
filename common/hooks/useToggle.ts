import { useEffect, useState, useRef } from "react";

/**
 * @description Attach a ref to both the trigger and element to toggle
 * to enable open/closing and close on outside click
 */
const useToggle = () => {
  const [open, setOpen] = useState(false);

  const toggledElement = useRef(null); // thing to open/close
  const triggerElement = useRef(null); // button

  const closeOnBodyClick = (e, state = true) => {
    if (
      triggerElement.current &&
      !triggerElement.current.contains(e.target) &&
      toggledElement.current &&
      !toggledElement.current.contains(e.target)
    ) {
      setOpen(() => false);
    }
  };

  const handleToggle = state => {
    setOpen(() => (state ? state : !open));
  };

  useEffect(() => {
    if (document) {
      document.addEventListener("click", closeOnBodyClick);
    }

    return () => {
      if (document) {
        document.removeEventListener("click", closeOnBodyClick);
      }
    };
  });
  return {
    toggleState: open,
    handleToggle,
    toggledElement,
    triggerElement
  };
};

export default useToggle;

import React, { useEffect, useRef } from "react";

export const useSetFocus = (trigger) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [trigger]);

  return inputRef;
};

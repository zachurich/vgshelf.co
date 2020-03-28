import { useState } from "react";
import { debounce } from "../utils";

const useDebounce = () => {
  const [timer, setTimer] = useState(null);
  return {
    timer,
    debounce: function(fnToDebounce, input) {
      let timeout = debounce(timer, fnToDebounce, input);
      setTimer(() => timeout);
    }
  };
};

export default useDebounce;

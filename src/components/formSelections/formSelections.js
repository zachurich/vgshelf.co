import React from "react";
import "./styles.scss";
import { IMAGES } from "../../../common/constants";

function FormSelections({ selections = [] }) {
  if (selections.length < 1) return null;
  return (
    <div className="form-selections">
      {selections.map((selection, index) => (
        <div className="form-selection">
          <img src={selection.cover ? selection.cover : IMAGES.MISSING} />
        </div>
      ))}
    </div>
  );
}

export default FormSelections;

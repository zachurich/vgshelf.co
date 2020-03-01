import React, { useState } from "react";
import "./styles.scss";
import { IMAGES } from "../../common/constants";
import Loader from "../loader/loader";

function ImageLoader({ src, className }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`${className} ${loading ? "loading" : "loaded"}`}>
      {loading && <Loader />}
      <img
        src={src}
        onLoad={() => setLoading(() => false)}
        onError={() => setLoading(() => false)}
      />
    </div>
  );
}

function FormSelections({ selections = [] }) {
  if (selections.length < 1) return null;

  return (
    <div className="form-selections">
      {selections.map((selection, index) => (
        <ImageLoader
          key={selection + "-" + index}
          className="form-selection"
          src={selection.cover ? selection.cover : IMAGES.MISSING}
        />
      ))}
    </div>
  );
}

export default FormSelections;

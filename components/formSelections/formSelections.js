import React, { useState, useRef, useEffect } from "react";
import { IMAGES } from "../../common/constants";
import Loader from "../loader/loader";

export function ImageLoader({ src, className = "", fallback = <Loader /> }) {
  const [loading, setLoading] = useState(true);
  const image = useRef(null);
  useEffect(() => {
    if (image.current && image.current.complete) {
      if (loading) {
        setLoading(false);
      }
    }
  }, [image.current]);
  return (
    <div
      className={`${className} ${loading ? "loading" : "loaded"}`}
      style={{ display: "inline" }}
    >
      {loading && fallback}
      <img
        ref={image}
        src={src}
        onLoad={() => {
          setLoading(() => false);
        }}
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

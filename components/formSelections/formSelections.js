import React, { useState, useRef, useEffect } from "react";
import { IMAGES } from "../../common/constants";
import Loader from "../loader/loader";
import CloseSVG from "../../assets/close.svg";

export function ImageLoader({
  src,
  className = "",
  fallback = <Loader />,
  children,
  ...props
}) {
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
    <div className={`${className} ${loading ? "loading" : "loaded"}`} {...props}>
      {loading && fallback}
      <img
        ref={image}
        src={src}
        onLoad={() => {
          setLoading(() => false);
        }}
        onError={() => setLoading(() => false)}
      />
      {!loading && children}
    </div>
  );
}

function FormSelections({ selections = [], handleRemoveSelection }) {
  if (selections.length < 1) return null;

  return (
    <div className="form-selections">
      {selections.map((selection, index) => (
        <ImageLoader
          key={selection + "-" + index}
          className="form-selection"
          src={selection.cover ? selection.cover : IMAGES.MISSING}
          onClick={() => handleRemoveSelection(selection)}
        >
          <div className="form-selection-remove">
            <CloseSVG size={12} />
          </div>
        </ImageLoader>
      ))}
    </div>
  );
}

export default FormSelections;

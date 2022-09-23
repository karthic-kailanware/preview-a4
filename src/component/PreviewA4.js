import React, { useMemo, useRef } from "react";

import useRefDimensions from "../hooks/useRefDimensions";

import "./style.css";

const PreviewA4 = (props) => {
  const {
    format = false,
    allowOverflow = false,
    print = false,
    children,
  } = props;

  const refPreview = useRef(null);
  const refDivTransformed = useRef(null);

  const { width: outerWidth } = useRefDimensions(refPreview);

  const innerHeight = useMemo(
    () => refDivTransformed.current?.getBoundingClientRect().height,
    []
  );

  const node = (
    <div
      ref={refPreview}
      className="template-preview"
      style={{
        minHeight: innerHeight,
      }}
    >
      <div
        ref={refDivTransformed}
        className="template-container"
        style={{
          transform: `scale(${outerWidth / 794}) translateX(-50%)`,
        }}
      >
        <div
          className="template-content"
          data-testid={print ? "print" : "no-print"}
          style={{
            overflow: allowOverflow ? "visible" : "hidden",
            ...(allowOverflow ? { minHeight: "1123px" } : { height: "1123px" }),
            padding: !print ? "24px" : "0",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return format ? (
    <div style={{ width: "21cm", minHeight: "29.7cm" }}>{node}</div>
  ) : (
    node
  );
};

export default PreviewA4;

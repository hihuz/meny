import React from "react";

const TextWithLineBreaks = ({ text, className }) => (
  <p className={className}>
    {text.split("\n").map((line, i, lineArr) => (
      <span key={line}>
        {line}
        {i < lineArr.length - 1 ? <br /> : null}
      </span>
    ))}
  </p>
);

export default TextWithLineBreaks;

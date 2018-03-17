import React from "react";

export default ({ code, text }) => (
  <a href={code} className="bookmarklet">
    {text}
  </a>
);

import React from "react";
export default function({ meta: { touched, error } }) {
  return touched && error ? <span className="error">{error}</span> : null;
}

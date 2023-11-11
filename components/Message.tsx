import React from "react";

export const Message = ({ text, user }) => {
  return (
    <div>
      <div>{user}</div>
      <div>{text}</div>
    </div>
  );
};

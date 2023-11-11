import React, { useState } from "react";

export const Conversation = () => {
  const [messages, setMessages] = useState([]);
  //   render the messages
  return (
    <div>
      <div>
        {messages.map((message) => (
          <div>{message.text}</div>
        ))}
      </div>
    </div>
  );
};

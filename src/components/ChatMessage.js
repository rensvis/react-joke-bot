import "./ChatMessage.css";
import React, { useEffect, useState } from "react";

const ChatMessage = (props) => {
  const time = `${props.time.getHours()}:${(
    "0" + props.time.getMinutes()
  ).slice(-2)}`;

  const authorClass =
    props.author === "bot" ? "chat-message--bot" : "chat-message--user";

  const [isTyping, setIsTyping] = useState(props.author === "bot" ? true : "");

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false);
      props.onFinishTyping()
    }, 1000);
  }, []);

  return (
    <div
      className={`chat-message ${authorClass} ${
        isTyping ? "chat-message--typing" : ""
      }`}
    >
      <div className="chat-message__bubble">
        <span className="chat-message__content">{props.content}</span>
        <span className="chat-message__time">{time}</span>

        {props.author === "bot" && (
          <div className="chat-message__dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

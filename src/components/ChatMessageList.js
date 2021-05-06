import "./ChatMessageList.css";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatMessageList = (props) => {
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className="chat-box__list chat-message-list">
      {props.messages.map((message, index) => (
        <ChatMessage
          key={index}
          author={message.author}
          content={message.content}
          time={message.time}
          onFinishTyping={scrollToBottom}
        />
      ))}
      <div className="chat-message-list__bottom-div" ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessageList;

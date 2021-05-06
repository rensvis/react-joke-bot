import "./ChatBox.css";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatNewMessage from "./ChatNewMessage";

const DEFAULT_MESSAGES = [
  {
    id: "1",
    author: "bot",
    content: "Hi! I'm the React Joke Bot. Ready to have a laugh?",
    time: new Date(),
  },
];

const ChatBox = (props) => {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  const clickHandler = () => {
    if (!props.isChatExpanded) {
      toggleVisibility();
    }
  };

  const toggleVisibility = () => {
    // call parent function to manage state
    props.onToggleChatVisibility();
  };

  const addMessageHandler = (message) => {
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
  };


  return (
    <div
      className={`chat-box ${!props.isChatExpanded ? "chat-box--collapsed" : ""}`}
      onClick={clickHandler}
    >
      <ChatHeader onMinimize={toggleVisibility} />
      <ChatMessageList messages={messages} />
      <ChatNewMessage onAddMessage={addMessageHandler} />
      <i className="far fa-comment chat-box__trigger-icon"></i>
    </div>
  );
};

export default ChatBox;

import "./ChatHeader.css";

const ChatHeader = (props) => {
  return (
    <div className="chat-box__header chat-header">
      <div className="chat-header__bot-image">
        <i className="fas fa-robot"></i>
      </div>
      <h2 className="chat-header__bot-name">React Chat Bot</h2>
      <div className="chat-header__minimize" onClick={props.onMinimize}>
        <div className="minimize"></div>
      </div>
    </div>
  );
};

export default ChatHeader;

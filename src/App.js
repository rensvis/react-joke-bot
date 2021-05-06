import "./App.css";
import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ModalOverlay from "./components/ModalOverlay";

function App() {
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatExpanded(!isChatExpanded);
    const body = document.getElementsByTagName("body")[0];
    if (isChatExpanded) {
      body.classList.remove("no-scroll"); // allow scroll on body
    } else {
      body.classList.add("no-scroll"); // prevent scroll on body
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <div className="container">
          <h1>React Joke Bot</h1>
          <h3>
            A project by <a href="http://rensvis.nl/">Rens Vis</a>
          </h3>
          <p>
            Welcome to the React Joke Bot. Press the button in the bottom right
            of the page to have a laugh!
          </p>
        </div>
        <div className="container card">
          <h2 className="card__title">About this project</h2>
          <h4>Description</h4>
          <p>
            The chat shows the user predefined phrases to choose from and the
            bot answers in a conversational context.
          </p>

          <h4>Under the hood</h4>
          <p>
            This is (clearly) a <i className="fab fa-react react-logo"></i>{" "}
            <span className="bold">React</span> project. The project consists of
            the following different components:
          </p>
          <ul>
            <li>ModalOverlay (dark background when the chatbox opens)</li>
            <li>ChatBox (the actual chatbox)</li>
            <li>ChatHeader (top section in the chatbox)</li>
            <li>ChatMessageList (middle section in the chatbox)</li>
            <li>ChatMessage (single messages)</li>
            <li>ChatNewMessage (bottom section in the chatbox)</li>
          </ul>

          <p>
            The jokes are pulled in via this <span className="bold">api</span>:{" "}
            <a href="https://jokeapi.dev/">joke api</a>.
          </p>

          <p>
            Check out the full <span className="bold">sourcecode</span> on{" "}
            <a href="https://github.com/rensvis/react-joke-bot">
              <i className="fab fa-github"></i> GitHub
            </a>
            .
          </p>
        </div>

        <div className="container footer">
          <p>
            - 2021 <a href="http://rensvis.nl/">Rens Vis</a> -
          </p>
        </div>
      </main>
      <ModalOverlay
        classModalOverlay={isChatExpanded ? "modal-overlay--is-visible" : ""}
        onClickOverlay={toggleChatVisibility}
      />
      <ChatBox
        onToggleChatVisibility={toggleChatVisibility}
        isChatExpanded={isChatExpanded}
      />
    </div>
  );
}

export default App;

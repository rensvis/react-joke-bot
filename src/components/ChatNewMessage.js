import { getRoles } from "@testing-library/dom";
import { useState } from "react";
import "./ChatNewMessage.css";

const USER_PHRASES = {
  getJoke: [
    "Yep, new joke please",
    "Let's do it",
    "Ok",
    "Alright then",
    "Uhu",
    "Why not",
    "Well, maybe one more",
    "Absolutely!",
    "We'll see",
    "Sure! :)",
    "Yup",
    "Give me a good one",
    "Better than last time please",
    "Yup, make me laugh",
    "Better than last time please",
    "Only if you can deliver a good one",
  ],
  positiveReply: [
    "Haha!",
    "Lol!",
    "I didn't see that one coming..!",
    "😂",
    "🤣",
    "👍",
    "👏👏👏",
    ":-P",
    "You're hilarious!",
    "Prety good",
    "Nice one",
    ":-P",
    "Standing ovation",
    "Brilliant",
  ],
  negativeReply: [
    "I don't get it",
    "😒",
    "¯_(ツ)_/¯",
    "🤦‍♂️",
    "🤦‍♂🤷‍♀️",
    "You call that funny?",
    "Hmm, no.",
    "Wait, what..?",
    "Nope, not funny",
    "That didn't do it for me, sorry",
    "Not trying to be rude here, but do you call that a joke?",
    "My grandma is funnier than you",
    "Nice try, maybe you'll get me next time",
  ],
};

const BOT_PHRASES = {
  positiveReply: [
    "Sweet, I'm glad you liked it",
    "You're welcome!",
    "Nice :)",
    "😎",
    "😜",
    "Woohoo!",
    "That's a winner, noted",
    "I knew I still had it in me",
    "I think I'm on a roll",
    "Yup, it's my day today",
    "I love putting on a good show",
    "This crowd is awesome!",
    "Haha",
    "(☞ﾟヮﾟ)☞)",
    "(¬‿¬)",
    "(❁´◡`❁)",
    "(●'◡'●)",
  ],
  negativeReply: [
    "Winners never quit and quiters never win",
    "Hmm, I am just a bot after all",
    "I promised I'm not configured by a German",
    "Sorry...",
    "I'll try harder next time",
    "Too bad",
    "Tough crowd",
    "😢",
    "༼ つ ◕_◕ ༽つ",
    "🤔",
    "ಥ_ಥ",
    "Yeah, I knew that one wasn't my best",
    "Maybe it's not my day",
    "You win some, you lose some",
    "Hang on, rebooting my creativity module",
    "Did you get it? Oh wel... 😒",
    "...",
    "(T_T)",
    "^_^",
    "(•_•)",
    "ಠ_ಠ",
    "(┬┬﹏┬┬)",
  ],
  askForNextJoke: [
    "Would you like to try another one?",
    "Encore?",
    "How about another one?",
    "There's plenty more where that came from",
    "Let me have another crack",
    "This next one might be right up your alley",
    "I already have the next one lined up. Wanna hear?",
    "You're not gonna wanna miss this next one. Ready?",
  ],
};

let jokeStatus = false; // whether getting joke or getting reaction
let userHappy = true; // latest user response: positive of negative
let allowClick = true; // false when bot talking

const ChatNewMessage = (props) => {
  // returns array of phrases
  const getRandomPhrases = (arr, n = null) => {
    let oneArray = true;
    if (!n) {
      n = arr.length;
      oneArray = false;
    }
    let result = [];

    for (let i = 0; i < n; i++) {
      const phrasesArray = oneArray ? arr[0] : arr[i];

      while (result.length - 1 < i) {
        const x = Math.floor(Math.random() * phrasesArray.length);
        const phrase = phrasesArray[x];
        if (!result.includes(phrase)) result.push(phrase);
      }
    }
    return result;
  };

  // const [chatStatus, setChatStatus] = useState(props.chatStatus);

  const defaultOptions = getRandomPhrases([USER_PHRASES.getJoke], 2);
  const [buttonOneText, setButtonOneValue] = useState(defaultOptions[0]);
  const [buttonTwoText, setButtonTwoValue] = useState(defaultOptions[1]);
  const [classHideButtons, setClassHideButtons] = useState("chat-new-message--hide-buttons");
  // let [jokeStatus, setJokeStatus] = useState(true);

  const sendMessage = (author, content) => {
    const message = {
      id: Math.random(),
      author: author,
      content: content,
      time: new Date(),
    };
    props.onAddMessage(message);
  };

  const changeJokeStatus = () => {
    jokeStatus = !jokeStatus;
  };

  const toggleAllowClick = () => {
    allowClick = !allowClick;
    setClassHideButtons((allowClick)?"":"chat-new-message--hide-buttons")
  };


  const buttonClickHandler = (e) => {
    if (!allowClick) return; // wait for bot to finish
    userHappy = e.target.dataset.emotion === "positive";
    toggleAllowClick();

    sendMessage("user", e.target.innerText);
    if (jokeStatus) {
    }
    console.log(e.target.dataset.emotion)
    console.log(e.target.dataset.emotion === "positive");


    let newButtonPhrases;
    if (jokeStatus) {
      newButtonPhrases = getRandomPhrases([USER_PHRASES.getJoke], 2);
    } else {
      newButtonPhrases = getRandomPhrases([
        USER_PHRASES.positiveReply,
        USER_PHRASES.negativeReply,
      ]);
    }
    setTimeout(() => {
      setButtonOneValue(newButtonPhrases[0]);
      setButtonTwoValue(newButtonPhrases[1]);
      getBotResponse();
    }, 600);
  };

  const finishBot = () => {
    changeJokeStatus();
    setTimeout(() => {
      toggleAllowClick();
    }, 1500);
  };

  const getBotResponse = () => {
    if (jokeStatus) {
      // GET REPLY
      console.log("userHappy", userHappy);
      const botReply = userHappy
        ? getRandomPhrases([BOT_PHRASES.positiveReply])
        : getRandomPhrases([BOT_PHRASES.negativeReply]);
      sendMessage("bot", botReply);

      // ask next
      setTimeout(() => {
        sendMessage("bot", getRandomPhrases([BOT_PHRASES.askForNextJoke]));
      }, 1000);

      finishBot();
    } else {
      // GET JOKE
      const url =
        "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
      // ajax request
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          response.json().then((data) => {
            if (data.type === "twopart") {
              // get setup
              sendMessage("bot", data.setup);
              // get delivery
              setTimeout(() => {
                sendMessage("bot", data.delivery);
                finishBot();
              }, 2500);
            } else {
              sendMessage("bot", data.joke);
              finishBot();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={`chat-box__form chat-new-message ${(!allowClick) ? classHideButtons:""}`}>
      <button
        onClick={buttonClickHandler}
        className="chat-new-message__button"
        data-emotion={jokeStatus ? "positive" : ""}
      >
        {buttonOneText}
      </button>
      <button
        onClick={buttonClickHandler}
        className="chat-new-message__button"
        data-emotion={jokeStatus ? "negative" : ""}
      >
        {buttonTwoText}
      </button>
      <p className="chat-new-message__loading-text">Wait for reply...</p>
    </div>
  );
};

export default ChatNewMessage;

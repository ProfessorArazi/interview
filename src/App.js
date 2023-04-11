import "./App.css";
import "@lottiefiles/lottie-player";
import { useEffect, useRef, useState } from "react";
import { askQuestion } from "./questionsReading/questionsAsking";

function App() {
  const playerRef = useRef();

  const [question, setQuestion] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const synth = window.speechSynthesis;

  const handleSpeak = async (type) => {
    const beforeQuestion = performance.now();
    const question = askQuestion(type);
    const afterQuestion = performance.now();
    console.log("question", afterQuestion - beforeQuestion);
    const beforeUtterance = performance.now();
    const utterance = await new SpeechSynthesisUtterance(question);
    const afterUtterance = performance.now();
    console.log("utterance", afterUtterance - beforeUtterance);
    const beforeVoices = performance.now();
    const voices = await synth.getVoices();
    const afterVoices = performance.now();
    console.log("voices", afterVoices - beforeVoices);
    if (voices.length) {
      const voice = voices.find(
        (voice) =>
          voice.voiceURI === "Microsoft David - English (United States)"
      );
      utterance.voice = voice;
    }
    utterance.onend = () => {
      playerRef.current?.stop();
      setDisableButton(false);
    };
    utterance.onstart = () => {
      playerRef.current?.play();
    };
    utterance.lang = "en-US";
    const beforeSpeak = performance.now();
    synth.speak(utterance);
    const afterSpeak = performance.now();
    console.log("speak", afterSpeak - beforeSpeak);
    const beforeSetQuestion = performance.now();
    setQuestion(question);
    const afterSetQuestion = performance.now();
    console.log("setQuestion", afterSetQuestion - beforeSetQuestion);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <lottie-player
        ref={playerRef}
        background="transparent"
        loop
        mode="normal"
        src="https://assets6.lottiefiles.com/private_files/lf30_emntxv1p.json"
        style={
          screenWidth > 768
            ? {
                width: "300px",
              }
            : {
                width: "100%",
                "margin-left": screenWidth < 768 ? "5%" : 0,
                height: "250px",
              }
        }
      ></lottie-player>

      <div className="actions">
        <button disabled={disableButton} onClick={() => handleSpeak("react")}>
          React
        </button>
        <button
          disabled={disableButton}
          onClick={() => handleSpeak("reactNative")}
        >
          React Native
        </button>
        <button disabled={disableButton} onClick={() => handleSpeak("js")}>
          JS
        </button>
        <button
          disabled={disableButton}
          onClick={() => handleSpeak("personal")}
        >
          Personal
        </button>
        <button disabled={disableButton} onClick={() => handleSpeak("random")}>
          Random
        </button>
      </div>

      {<h1 className="question">{question}</h1>}
    </div>
  );
}

export default App;
import "./App.css";
import "@lottiefiles/lottie-player";
import { useEffect, useRef, useState } from "react";
import { askQuestion } from "./questionsReading/questionsAsking";
import { MdSubtitles, MdCameraAlt } from "react-icons/md";
import WebcamComponent from "./webcam/WebcamComponent";

function App() {
  const playerRef = useRef();

  const [question, setQuestion] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [speed, setSpeed] = useState("1");

  const synth = window.speechSynthesis;

  const handleSpeak = async (type) => {
    setDisableButton(true);
    const question = askQuestion(type);
    const utterance = await new SpeechSynthesisUtterance(question);
    const voices = await synth.getVoices();
    if (voices.length) {
      const voice = voices.find(
        (voice) =>
          voice.voiceURI === "Microsoft David - English (United States)"
      );
      utterance.voice = voice;
      if (!+speed.trim()) {
        await setSpeed("1");
        utterance.rate = "1";
      } else if (+speed.trim() > 2) {
        await setSpeed("2");
        utterance.rate = "2";
      } else utterance.rate = speed || "1";
    }
    utterance.onend = () => {
      playerRef.current?.stop();
      setDisableButton(false);
    };
    utterance.onstart = () => {
      playerRef.current?.play();
    };
    utterance.lang = "en-US";
    synth.speak(utterance);
    setQuestion(question);
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
      <div className="options">
        <div className="speed_input">
          <label>speed</label>
          <input
            disabled={disableButton}
            value={speed}
            min={0.1}
            max={2}
            step={0.1}
            type="number"
            onChange={async (e) => await setSpeed(e.target.value)}
          />
        </div>
        <div>
          <button onClick={() => setShowQuestion((prev) => !prev)}>
            <MdSubtitles
              size={screenWidth < 768 ? 24 : 40}
              color={showQuestion ? "#D6B370" : "#fff"}
            />
          </button>
          <button onClick={() => setShowCamera((prev) => !prev)}>
            <MdCameraAlt
              size={screenWidth < 768 ? 24 : 40}
              color={showCamera ? "#D6B370" : "#fff"}
            />
          </button>
        </div>
      </div>
      <div className="zoom">
        <lottie-player
          speed={speed}
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
                  flex: 1,
                  width: "auto",
                  "margin-left": "5%",
                  height: "250px",
                }
          }
        ></lottie-player>
        {showCamera && (
          <WebcamComponent
            closeCamera={() => setShowCamera(false)}
            width={screenWidth}
          />
        )}
      </div>

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

      {showQuestion && <h1 className="question">{question}</h1>}
    </div>
  );
}

export default App;

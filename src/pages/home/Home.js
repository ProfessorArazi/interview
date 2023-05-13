import React, { useContext } from "react";
import "@lottiefiles/lottie-player";
import { MdSubtitles, MdCameraAlt, MdPerson, MdEdit } from "react-icons/md";
import WebcamComponent from "../../components/webcam/WebcamComponent";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { useRef, useState } from "react";
import { handleSpeak } from "../../helpers/speak/handleSpeak";
import {
  resetHandler,
  updateQuestions,
} from "../../helpers/questionsReading/questionsAsking";
import { ApiContext } from "../../store/api-context";

const Home = ({
  setPage,
  subjects,
  setShowDefaultSubjects,
  showDefaultSubjects,
  setCommunitySubjects,
  screenWidth,
  isAdmin,
  community,
  customSubjects,
}) => {
  const { getCommunityHandler } = useContext(ApiContext);
  const playerRef = useRef();

  const [question, setQuestion] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [firstCamera, setFirstCamera] = useState(true);
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState("1");

  const getCommunity = async () => {
    if (community.length > 0) {
      resetHandler(showDefaultSubjects, false);
      return setCommunitySubjects([]);
    }
    const data = await getCommunityHandler();
    if (!data) return;
    const subjects = updateQuestions(data.questions, true);
    setCommunitySubjects(subjects);
  };

  const speakHandler = async (type) => {
    const speakData = {
      setDisableButton,
      setSpeed,
      speed,
      playerRef,
      setQuestion,
      setLoading,
    };
    handleSpeak(type, speakData);
  };

  return (
    <>
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
          <button
            onClick={() => {
              showCamera && setFirstCamera(false);
              setShowCamera((prev) => !prev);
            }}
          >
            <MdCameraAlt
              size={screenWidth < 768 ? 24 : 40}
              color={showCamera ? "#D6B370" : "#fff"}
            />
          </button>
          {(!localStorage.getItem("data") || isAdmin) && (
            <button onClick={() => setPage(isAdmin ? "admin" : "login")}>
              <MdPerson size={screenWidth < 768 ? 24 : 40} color={"#fff"} />
            </button>
          )}
          {customSubjects.length > 0 && (
            <button onClick={() => setPage("edit")}>
              <MdEdit size={screenWidth < 768 ? 24 : 40} color={"#fff"} />
            </button>
          )}
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
                  "marginLeft": "5%",
                  height: "250px",
                }
          }
        ></lottie-player>
        {showCamera && (
          <WebcamComponent
            closeCamera={() => setShowCamera(false)}
            width={screenWidth}
            first={firstCamera}
          />
        )}
      </div>
      {loading && <LoadingSpinner />}
      {showQuestion && !loading && (
        <h1
          dir={question.match(/[a-z]/gi) ? "ltr" : "rtl"}
          className="question"
        >
          {question}
        </h1>
      )}
      {!loading && (
        <>
          <div className="custom">
            <button disabled={disableButton} onClick={() => setPage("form")}>
              Custom
            </button>

            <button
              disabled={disableButton}
              onClick={() => {
                resetHandler(!showDefaultSubjects, !!community.length);
                setShowDefaultSubjects((prev) => !prev);
              }}
            >
              {showDefaultSubjects ? "Remove Default" : "Show Default"}
            </button>
            <button disabled={disableButton} onClick={getCommunity}>
              Community
            </button>
          </div>
          <div className="actions">
            {subjects.length > 1 &&
              subjects.map((subject) => {
                const idIndex = subject.lastIndexOf("-");
                return (
                  <button
                    key={subject}
                    disabled={disableButton}
                    onClick={() => speakHandler(subject)}
                  >
                    {idIndex === -1 ? subject : subject.slice(0, idIndex)}
                  </button>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

import React, { useCallback, useContext, useEffect } from "react";
import "@lottiefiles/lottie-player";
import {
  MdSubtitles,
  MdCameraAlt,
  MdPerson,
  MdEdit,
  MdSearch,
} from "react-icons/md";
import WebcamComponent from "../../components/webcam/WebcamComponent";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { useRef, useState } from "react";
import { handleSpeak } from "../../helpers/speak/handleSpeak";
import { updateQuestions } from "../../helpers/questionsReading/questionsAsking";
import { ApiContext } from "../../store/api-context";
import Select from "./Select";

const Home = ({
  setPage,
  communitySubjects,
  setCommunitySubjects,
  screenWidth,
  isAdmin,
  customSubjects,
}) => {
  const {
    getCommunityHandler,
    removeCommunityHandler,
    getCommunityKeysHandler,
  } = useContext(ApiContext);
  const playerRef = useRef();
  const [subjects, setSubjects] = useState([
    ...customSubjects,
    ...communitySubjects,
  ]);

  const [question, setQuestion] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [firstCamera, setFirstCamera] = useState(true);
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState("1");
  const [communityKeys, setCommunityKeys] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const getCommunity = async (id, setSelectLoading) => {
    setSelectLoading(id);
    if (screenWidth > 768) setLoading(true);
    const data = await getCommunityHandler(id);
    if (!data) return;
    const subjects = updateQuestions(data, "addCommunity");
    setCommunitySubjects(subjects);
    const updatedSubjects = [...customSubjects, ...subjects];
    setSubjects(updatedSubjects);
    setLoading(false);
    setSelectLoading(false);
  };

  const removeCommunity = async (id, setSelectLoading) => {
    setSelectLoading(id);
    if (screenWidth > 768) setLoading(true);
    await removeCommunityHandler(id);
    const subjects = updateQuestions({ id }, "removeCommunity");
    setCommunitySubjects(subjects);
    const updatedSubjects = [...customSubjects, ...subjects];
    setSubjects(updatedSubjects);
    setLoading(false);
    setSelectLoading(false);
  };

  const getCommunityKeys = useCallback(async () => {
    const data = await getCommunityKeysHandler(setLoading);
    const { subjects } = data;
    if (subjects) setCommunityKeys(subjects);
  }, [getCommunityKeysHandler, setLoading, setCommunityKeys]);

  const searchValueChangeHandler = (e) => {
    const inputValue = !e ? e : e.target.value.toLowerCase();
    setFilteredSubjects(
      !inputValue.trim()
        ? []
        : communityKeys.filter((key) =>
            key.subject.toLowerCase().startsWith(inputValue)
          )
    );
  };

  const speakHandler = async (type) => {
    const speakData = {
      setDisableButton,
      setSpeed,
      speed,
      playerRef,
      setQuestion,
      setLoading,
      communitySubjects,
      customSubjects,
    };
    handleSpeak(type, speakData);
  };

  useEffect(() => {
    getCommunityKeys();
  }, [getCommunityKeys]);

  return (
    <>
      <div className="options">
        <div>
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
          {screenWidth > 768 && (
            <Select
              communitySubjects={communitySubjects}
              searchValueChangeHandler={searchValueChangeHandler}
              filteredSubjects={filteredSubjects.filter(
                (element) =>
                  !communitySubjects.find(
                    (subject) => subject._id === element._id
                  )
              )}
              getCommunity={getCommunity}
              removeCommunity={removeCommunity}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              showSearch={showSearch}
            />
          )}
        </div>
        <div>
          <button
            onClick={() =>
              setTimeout(() => {
                setShowSearch((prev) => !prev);
              }, 1)
            }
          >
            <MdSearch
              size={screenWidth <= 768 ? 24 : 40}
              color={showSearch ? "#D6B370" : "#fff"}
            />
          </button>

          <button
            onClick={() => {
              showCamera && setFirstCamera(false);
              setShowCamera((prev) => !prev);
            }}
          >
            <MdCameraAlt
              size={screenWidth <= 768 ? 24 : 40}
              color={showCamera ? "#D6B370" : "#fff"}
            />
          </button>
          {(!localStorage.getItem("data") || isAdmin) && (
            <button onClick={() => setPage(isAdmin ? "admin" : "login")}>
              <MdPerson size={screenWidth <= 768 ? 24 : 40} color={"#fff"} />
            </button>
          )}
          {customSubjects.length > 0 && (
            <button onClick={() => setPage("edit")}>
              <MdEdit size={screenWidth <= 768 ? 24 : 40} color={"#fff"} />
            </button>
          )}
          <button onClick={() => setShowQuestion((prev) => !prev)}>
            <MdSubtitles
              size={screenWidth <= 768 ? 24 : 40}
              color={showQuestion ? "#D6B370" : "#fff"}
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
                  marginLeft: "5%",
                }
              : {
                  flex: 1,
                  width: "auto",
                  marginLeft: "5%",
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
      {!loading && showQuestion && (
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
          </div>
          {screenWidth <= 768 && showSearch ? (
            <Select
              communitySubjects={communitySubjects}
              searchValueChangeHandler={searchValueChangeHandler}
              filteredSubjects={filteredSubjects.filter(
                (element) =>
                  !communitySubjects.find(
                    (subject) => subject._id === element._id
                  )
              )}
              getCommunity={getCommunity}
              removeCommunity={removeCommunity}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              mobile
            />
          ) : (
            <div className="actions">
              {subjects.length > 1 && (
                <button
                  key="random"
                  disabled={disableButton}
                  onClick={() => speakHandler("Random")}
                >
                  Random
                </button>
              )}
              {subjects.length > 0 &&
                subjects.map((subject, index) => {
                  const idIndex = subject.subject.lastIndexOf("-");
                  return (
                    <button
                      key={subject._id}
                      disabled={disableButton}
                      onClick={() =>
                        speakHandler(
                          subject.subject === "Random"
                            ? subject.subject
                            : subject._id
                        )
                      }
                    >
                      {idIndex === -1
                        ? subject.subject
                        : subject.subject.slice(0, idIndex)}
                    </button>
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;

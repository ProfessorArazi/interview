import React, { useEffect, useState } from "react";
import "@lottiefiles/lottie-player";
import { MdArrowForward } from "react-icons/md";
import "./Login.css";
import { httpRequest } from "../../helpers/http/httpRequest";
import {
  customTypes,
  updateQuestions,
} from "../../helpers/questionsReading/questionsAsking";
import LoadingSpinner from "../loading/LoadingSpinner";

const Login = ({ closeLogin, screenWidth, setCustomSubjects, setIsAdmin }) => {
  const [signup, setSignup] = useState(false);
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const lottiePlayer = document.querySelector("lottie-player");
    if (lottiePlayer) {
      setIsLottieLoaded(true);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const customQuestions = Object.entries(customTypes).map((q) => ({
      subject: q[0],
      questions: q[1],
    }));
    setIsLoading(true);
    const data = await httpRequest({
      method: "post",
      url: `/users${signup ? "" : "/login"}`,
      data: { ...values, questions: customQuestions },
    });
    if (!data.token) {
      setIsLoading(false);
      return "error";
    }
    if (!signup) {
      const subjects = updateQuestions(data.questions);
      setCustomSubjects(subjects);
    }

    if (data.isAdmin) {
      setIsAdmin(true);
    }

    localStorage.setItem(
      "data",
      JSON.stringify({ token: data.token, id: data.id })
    );
    closeLogin();
  };

  return isLoading ? (
    <div className="center">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <div className="options back">
        <button onClick={closeLogin}>
          <MdArrowForward size={screenWidth < 768 ? 24 : 40} color={"#fff"} />
        </button>
      </div>
      <lottie-player
        background="transparent"
        src="https://assets6.lottiefiles.com/private_files/lf30_emntxv1p.json"
        style={
          screenWidth > 768
            ? {
                width: "200px",
                "margin-left": "1%",
              }
            : {
                flex: 1,
                width: "50%",
                "margin-left": "5%",
                height: "100px",
              }
        }
      ></lottie-player>
      {isLottieLoaded && (
        <>
          <h1 className="title login-title">Sign {signup ? "Up" : "In"}</h1>
          <form className="form login-form" onSubmit={submitHandler}>
            <input
              placeholder="user name"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <h4
              onClick={() => setSignup((prev) => !prev)}
              className="title login-title"
            >
              Sign {signup ? "In" : "Up"}
            </h4>
            <div className="button-container">
              <button>{signup ? "Register" : "Login"}</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Login;

import React, { useContext, useEffect, useRef, useState } from "react";
import "@lottiefiles/lottie-player";
import { MdArrowForward } from "react-icons/md";
import "./Login.css";
import LoadingSpinner from "../loading/LoadingSpinner";
import { ApiContext } from "../../store/api-context";

const Login = ({
  setPage,
  screenWidth,
  setCustomSubjects,
  setCommunitySubjects,
  setIsAdmin,
  customQuestions,
  communityQuestions,
}) => {
  const { setError, loginOrSignup } = useContext(ApiContext);

  const lottieRef = useRef(null);

  const [signup, setSignup] = useState(false);
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (lottieRef.current) {
      timer = setTimeout(() => {
        setIsLottieLoaded(true);
      }, 100);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [lottieRef]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!values.userName.trim() || !values.password.trim()) return;
    setIsLoading(true);
    loginOrSignup(
      signup,
      values,
      customQuestions,
      communityQuestions,
      setIsLoading,
      setCustomSubjects,
      setCommunitySubjects,
      setIsAdmin,
      setPage,
      setError
    );
  };

  return isLoading ? (
    <div className="center">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <div className="options back">
        <button onClick={() => setPage("home")}>
          <MdArrowForward size={screenWidth <= 768 ? 24 : 40} color={"#fff"} />
        </button>
      </div>
      <lottie-player
        ref={lottieRef}
        background="transparent"
        src="https://assets6.lottiefiles.com/private_files/lf30_emntxv1p.json"
        style={
          screenWidth > 768
            ? {
                width: "200px",
                marginLeft: "1%",
              }
            : {
                flex: 1,
                width: "50%",
                marginLeft: "5%",
                height: "100px",
              }
        }
      ></lottie-player>
      {isLottieLoaded && (
        <>
          <h1 className="title login-title">Sign {signup ? "Up" : "In"}</h1>
          <form className="form login-form" onSubmit={submitHandler}>
            <input
              value={values.userName}
              placeholder="user name"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
            <input
              value={values.password}
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
              <button
                disabled={!values.userName.trim() || !values.password.trim()}
              >
                {signup ? "Register" : "Login"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Login;

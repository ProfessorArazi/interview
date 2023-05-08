import React, { useEffect, useState } from "react";
import "@lottiefiles/lottie-player";
import { MdArrowForward } from "react-icons/md";
import "./Login.css";

const Login = ({ closeLogin, screenWidth }) => {
  const [signup, setSignup] = useState(false);
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);

  useEffect(() => {
    const lottiePlayer = document.querySelector("lottie-player");
    if (lottiePlayer) {
      setIsLottieLoaded(true);
    }
  }, []);

  return (
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
          <form className="form login-form" onSubmit={() => {}}>
            <input
              placeholder="user name"
              // onChange={(e) =>
              //   setValues((prev) => ({ ...prev, subject: e.target.value }))
              // }
            />
            <input
              type="password"
              placeholder="password"
              // onChange={(e) =>
              //   setValues((prev) => ({ ...prev, subject: e.target.value }))
              // }
            />
            <h5
              onClick={() => setSignup((prev) => !prev)}
              className="title login-title"
            >
              Sign {signup ? "In" : "Up"}
            </h5>
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

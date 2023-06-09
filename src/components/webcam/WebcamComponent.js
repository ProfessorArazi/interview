import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import LoadingSpinner from "../loading/LoadingSpinner";

const WebcamComponent = ({ width, closeCamera, first }) => {
  const webcamRef = useRef(null);
  const [isWebcamLoaded, setIsWebcamLoaded] = useState(false);

  useEffect(() => {
    const currentWebcamRef = webcamRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (currentWebcamRef) {
          currentWebcamRef.srcObject = stream;
          setIsWebcamLoaded(true);
        }
      })
      .catch((error) => {
        alert("You have to enable camera permissions");
        closeCamera();
      });

    return () => {
      if (currentWebcamRef) {
        currentWebcamRef.srcObject = null;
      }
    };
  }, [closeCamera]);

  return (
    <>
      <div
        className={`webcam_container ${
          !isWebcamLoaded ? "webcam_container_hidden" : ""
        }`}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          style={width < 768 ? { width: "100%", height: "100%" } : {}}
        />
      </div>
      {!isWebcamLoaded && first && <LoadingSpinner />}
    </>
  );
};

export default WebcamComponent;

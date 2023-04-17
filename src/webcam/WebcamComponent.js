import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = ({ width, closeCamera }) => {
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
  }, []);

  return (
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
  );
};

export default WebcamComponent;

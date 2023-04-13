import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent = ({width}) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const currentWebcamRef = webcamRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (currentWebcamRef) {
          currentWebcamRef.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

    return () => {
      if (currentWebcamRef) {
        currentWebcamRef.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="webcam_container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        style={{ width: width < 768 ? "100%" : "auto" }}
      />
    </div>
  );
};

export default WebcamComponent;

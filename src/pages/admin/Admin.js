import React, { useEffect, useState } from "react";
import { httpRequest } from "../../helpers/http/httpRequest";
import { MdArrowForward, MdCheckCircle } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Admin.css";

const Admin = ({ closeAdmin, screenWidth }) => {
  const [questions, setQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [rejectedQuestions, setRejectedQuestions] = useState([]);

  useEffect(() => {
    const getInvalidQuestions = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      if (data) {
        const questions = await httpRequest({
          method: "post",
          url: "/community",
          data: { ...data, valid: false },
        });
        setQuestions(questions.questions);
      }
    };

    getInvalidQuestions();
  }, []);

  const cancelHandler = (id, data, setData) => {
    const temp = [...data];
    const index = data.indexOf(id);
    temp.splice(index, 1);
    setData(temp);
  };

  const submitHandler = () => {
    const user = JSON.parse(localStorage.getItem("data"));

    httpRequest({
      method: "post",
      url: "/approveQuestions",
      data: {
        approved: approvedQuestions,
        rejected: rejectedQuestions,
        ...user,
      },
    });
    closeAdmin();
  };

  return (
    <>
      <div className="options back">
        <button onClick={submitHandler}>
          <MdArrowForward size={screenWidth < 768 ? 24 : 40} color={"#fff"} />
        </button>
      </div>
      <h1 className="title">Admin</h1>
      {questions.length === 0 ? (
        <h3>No Pending Questions</h3>
      ) : (
        <div className="container">
          {questions.map((question) => (
            <div className="box" key={question._id}>
              <h3>{question.subject}</h3>
              <ul>
                {question.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
              <div className="admin-actions">
                {rejectedQuestions.includes(question._id) ? (
                  <button
                    onClick={() =>
                      cancelHandler(
                        question._id,
                        rejectedQuestions,
                        setRejectedQuestions
                      )
                    }
                  >
                    Rejected
                  </button>
                ) : approvedQuestions.includes(question._id) ? (
                  <button
                    onClick={() =>
                      cancelHandler(
                        question._id,
                        approvedQuestions,
                        setApprovedQuestions
                      )
                    }
                  >
                    Approved
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setRejectedQuestions((prev) => [...prev, question._id])
                      }
                    >
                      <AiFillCloseCircle
                        size={screenWidth < 768 ? 24 : 40}
                        color={"#b51a1a"}
                      />
                    </button>
                    <button
                      onClick={() =>
                        setApprovedQuestions((prev) => [...prev, question._id])
                      }
                    >
                      <MdCheckCircle
                        size={screenWidth < 768 ? 24 : 40}
                        color={"green"}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      <button onClick={submitHandler} className="admin-submit">
        Submit
      </button>
        </div>
      )}
      </>
  );
};

export default Admin;

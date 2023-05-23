import React, { useContext, useEffect, useState } from "react";
import { MdArrowForward, MdCheckCircle } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Admin.css";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { ApiContext } from "../../store/api-context";

const Admin = ({ closeAdmin, screenWidth }) => {
  const { getInvalidQuestions, approveQuestions } = useContext(ApiContext);

  const [questions, setQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [rejectedQuestions, setRejectedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getInvalidQuestions(setQuestions, setIsLoading);
  }, [getInvalidQuestions]);

  const cancelHandler = (id, data, setData) => {
    const temp = [...data];
    const index = data.indexOf(id);
    temp.splice(index, 1);
    setData(temp);
  };

  const submitHandler = () => {
    if (approvedQuestions.length === 0 && rejectedQuestions.length === 0) {
      return closeAdmin();
    }
    approveQuestions(approvedQuestions, rejectedQuestions, closeAdmin);
  };

  return (
    <>
      <div className="options back">
        <button onClick={submitHandler}>
          <MdArrowForward size={screenWidth <= 768 ? 24 : 40} color={"#fff"} />
        </button>
      </div>
      <h1 className="title">Admin</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : questions.length === 0 ? (
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
                        size={screenWidth <= 768 ? 24 : 40}
                        color={"#b51a1a"}
                      />
                    </button>
                    <button
                      onClick={() =>
                        setApprovedQuestions((prev) => [...prev, question._id])
                      }
                    >
                      <MdCheckCircle
                        size={screenWidth <= 768 ? 24 : 40}
                        color={"green"}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {questions.length > 0 && (
        <button onClick={submitHandler} className="admin-submit">
          Submit
        </button>
      )}
    </>
  );
};

export default Admin;

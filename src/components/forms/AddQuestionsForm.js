import React from "react";
import { useState } from "react";
import { addQuestions } from "../../helpers/questionsReading/questionsAsking";
import "./AddQuestionsForm.css";
import { MdArrowForward } from "react-icons/md";
import { httpRequest } from "../../helpers/http/httpRequest";

const AddQuestionsForm = ({ closeForm, setCustomSubjects, screenWidth }) => {
  const [values, setValues] = useState({ subject: "", questions: "" });
  const [errors, setErrors] = useState({
    subject: null,
    questions: null,
  });
  const [community, setCommunity] = useState(false);
  let disabled = !values.subject.trim() || !values.questions.trim();

  const addQuestionsHandler = (e) => {
    e.preventDefault();
    if (disabled) {
      return setErrors({
        subject: !values.subject.trim(),
        questions: !values.questions.trim(),
      });
    }
    addQuestions(values);
    setCustomSubjects((prev) =>
      prev.includes(values.subject) ? prev : [...prev, values.subject]
    );
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      httpRequest({
        method: "post",
        url: "/addQuestions",
        data: {
          ...data,
          questions: [{ ...values, questions: values.questions.split("\n") }],
          community,
        },
      });
    }

    closeForm();
  };

  return (
    <>
      <div className="options back">
        <button onClick={closeForm}>
          <MdArrowForward size={screenWidth < 768 ? 24 : 40} color={"#fff"} />
        </button>
      </div>
      <h1 className="title">Custom Questions</h1>
      <form className="form" onSubmit={addQuestionsHandler}>
        <input
          className={errors.subject && "error"}
          dir={
            values.subject.match(/[a-z]/gi) || !values.subject ? "ltr" : "rtl"
          }
          placeholder="Subject"
          onChange={(e) => {
            setErrors((prev) => ({ ...prev, subject: null }));
            setValues((prev) => ({ ...prev, subject: e.target.value }));
          }}
        />
        <textarea
          className={errors.questions && "error"}
          dir={
            values.questions.match(/[a-z]/gi) || !values.questions
              ? "ltr"
              : "rtl"
          }
          rows={10}
          onChange={(e) => {
            setErrors((prev) => ({ ...prev, questions: null }));
            setValues((prev) => ({ ...prev, questions: e.target.value }));
          }}
        />
        <div className="button-container">
          <button disabled={disabled}>Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddQuestionsForm;

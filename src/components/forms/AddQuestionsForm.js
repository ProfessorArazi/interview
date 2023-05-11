import React from "react";
import { useState } from "react";
import { addQuestions } from "../../helpers/questionsReading/questionsAsking";
import "./AddQuestionsForm.css";
import { MdArrowForward } from "react-icons/md";
import { addQuestionsRequest, user } from "../../helpers/http/api";

const AddQuestionsForm = ({ closeForm, setCustomSubjects, screenWidth }) => {
  const [values, setValues] = useState({ subject: "", questions: "" });
  const [errors, setErrors] = useState({
    subject: null,
    questions: null,
  });
  const [community, setCommunity] = useState(false);
  let disabled = !values.subject.trim() || !values.questions.trim();

  const addQuestionsHandler = async (e) => {
    e.preventDefault();
    if (disabled) {
      return setErrors({
        subject: !values.subject.trim(),
        questions: !values.questions.trim(),
      });
    }
    const customSubject = await addQuestions(values);
    setCustomSubjects((prev) => [...prev, customSubject]);
    const data = JSON.parse(localStorage.getItem("data"));
    if (data || community) {
      addQuestionsRequest(data, values, community);
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
        <p className="format">
          על מנת שהמערכת תוכל לקרוא את השאלות שלכם, עליכם לרדת שורה לאחר כל שאלה
          <br /> דוגמה: <br /> ספרי לי על עצמך <br /> מה החוזקות שלך? <br />{" "}
          מדוע את רוצה לעבוד בחברה שלנו?
          {!user && (
            <>
              <br />
              <br />
            </>
          )}
          {!user &&
            ` אם אתם רוצים שהמערכת תשמור את השאלות שלכם לפעמים הבאות אתם צריכים
          להירשם לאתר דרך האייקון של האיש בדף הבית`}
        </p>
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
        <label className="community">
          <input
            type="checkbox"
            onChange={() => setCommunity((prev) => !prev)}
            value={community}
          />
          I would like to share the questions with the community
        </label>
        <div className="button-container">
          <button disabled={disabled}>Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddQuestionsForm;

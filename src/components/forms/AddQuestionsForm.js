import React, { useContext } from "react";
import { useState } from "react";
import {
  addQuestions,
  customWithIds,
  editQuestion,
  getCustomQuestionsForEdit,
} from "../../helpers/questionsReading/questionsAsking";
import "./AddQuestionsForm.css";
import { MdArrowForward } from "react-icons/md";
import { ApiContext } from "../../store/api-context";

const AddQuestionsForm = ({
  closeForm,
  setCustomSubjects,
  screenWidth,
  customSubjects,
}) => {
  const { addQuestionsRequest, editQuestions, user } = useContext(ApiContext);

  const [values, setValues] = useState({ subject: "", questions: "" });
  const [errors, setErrors] = useState({
    subject: null,
    questions: null,
  });
  const [community, setCommunity] = useState(false);
  const [pickedSubjectForEdit, setPickedSubjectForEdit] = useState(false);
  let disabled = !values.subject.trim() || !values.questions.trim();

  const addQuestionsHandler = async (e) => {
    e.preventDefault();
    if (disabled) {
      return setErrors({
        subject: !values.subject.trim(),
        questions: !values.questions.trim(),
      });
    }
    const data = JSON.parse(localStorage.getItem("data"));
    if (pickedSubjectForEdit) {
      const subject = editQuestion(values, pickedSubjectForEdit);
      const temp = [...customSubjects];
      temp.splice(temp.indexOf(pickedSubjectForEdit), 1, subject);
      setCustomSubjects(temp);
      if (data) {
        const subjectId = customWithIds.find(
          (custom) =>
            custom.subject ===
            pickedSubjectForEdit.slice(0, pickedSubjectForEdit.lastIndexOf("-"))
        )._id;
        editQuestions(data, values , subjectId);
      }
    } else {
      const customSubject = addQuestions(values);
      setCustomSubjects((prev) => [...prev, customSubject]);
      if (data || community) {
        addQuestionsRequest(data, values, community);
      }
    }

    closeForm();
  };

  const getQuestionsHandler = (type, subject) => {
    const questions = getCustomQuestionsForEdit(type);
    setValues({
      subject,
      questions,
    });
    setPickedSubjectForEdit(type);
  };

  return (
    <>
      <div className="options back">
        <button onClick={closeForm}>
          <MdArrowForward size={screenWidth < 768 ? 24 : 40} color={"#fff"} />
        </button>
      </div>
      <h1 className="title">{customSubjects ? "Edit" : "Custom"} Questions</h1>
      {customSubjects && !pickedSubjectForEdit ? (
        <div className="actions">
          {customSubjects.map((subject) => {
            const idIndex = subject.lastIndexOf("-");
            return (
              <button
                key={subject}
                onClick={() =>
                  getQuestionsHandler(subject, subject.slice(0, idIndex))
                }
              >
                {subject.slice(0, idIndex)}
              </button>
            );
          })}
        </div>
      ) : (
        <form className="form" onSubmit={addQuestionsHandler}>
          <div className="subject-container">
            <input
              value={values.subject}
              maxLength={14}
              className={errors.subject && "error"}
              dir={
                values.subject.match(/[a-z]/gi) || !values.subject
                  ? "ltr"
                  : "rtl"
              }
              placeholder="Subject"
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, subject: null }));
                setValues((prev) => ({ ...prev, subject: e.target.value }));
              }}
            />
            <div>
              <p>Length: {values.subject.length}/14</p>
            </div>
          </div>

          <p className="format">
            על מנת שהמערכת תוכל לקרוא את השאלות שלכם, עליכם לרדת שורה לאחר כל
            שאלה
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
            value={values.questions}
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
            {pickedSubjectForEdit && <button className="delete">Delete</button>}
          </div>
        </form>
      )}
    </>
  );
};

export default AddQuestionsForm;

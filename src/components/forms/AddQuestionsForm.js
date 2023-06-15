import React, { useContext } from "react";
import { useState } from "react";
import {
  deleteQuestion,
  getCustomQuestionsForEdit,
  updateQuestions,
} from "../../helpers/questionsReading/questionsAsking";
import "./AddQuestionsForm.css";
import { MdArrowForward } from "react-icons/md";
import { ApiContext } from "../../store/api-context";
import { DeleteConfirmation } from "../ui/DeleteConfirmation";
import LoadingSpinner from "../loading/LoadingSpinner";

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

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
      if (data) {
        setLoading(true);
        const subjects = await editQuestions(
          data,
          values,
          pickedSubjectForEdit
        );
        if (subjects) setCustomSubjects(subjects);
      } else {
        const subjects = updateQuestions(
          { questions: values, id: pickedSubjectForEdit },
          "customEdit"
        );

        setCustomSubjects(subjects);
      }
    } else {
      let res = {};
      if (data || community) {
        setLoading(true);
        res = await addQuestionsRequest(data, values, community);
      }
      const subjects = updateQuestions(
        { questions: res.questions || values },
        res.questions ? "customUpdate" : "customCreate"
      );
      setCustomSubjects(subjects);
    }

    closeForm();
  };

  const getQuestionsHandler = (subject) => {
    const data = getCustomQuestionsForEdit(subject);
    setValues({
      subject: data.subject,
      questions: data.questions,
    });
    setPickedSubjectForEdit(subject);
  };

  const deleteQuestionsHandler = async () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setLoading(true);
      const subjects = await editQuestions(
        data,
        null,
        pickedSubjectForEdit,
        setCustomSubjects
      );
      if (subjects) setCustomSubjects(subjects);
    } else {
      const subjects = deleteQuestion(pickedSubjectForEdit);
      setCustomSubjects(subjects);
    }
    closeForm();
  };

  return (
    <>
      {!loading && (
        <div className="options back">
          <button
            onClick={() =>
              pickedSubjectForEdit
                ? setPickedSubjectForEdit(false)
                : closeForm()
            }
          >
            <MdArrowForward
              size={screenWidth <= 768 ? 24 : 40}
              color={"#fff"}
            />
          </button>
        </div>
      )}
      <h1 className="title">{customSubjects ? "Edit" : "Custom"} Questions</h1>
      {loading ? (
        <LoadingSpinner />
      ) : customSubjects && !pickedSubjectForEdit ? (
        <div className="actions">
          {customSubjects.map((custom) => {
            return (
              <button
                key={custom.subject}
                onClick={() => getQuestionsHandler(custom._id)}
              >
                {custom.subject}
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
          {!pickedSubjectForEdit && (
            <label className="community">
              <input
                type="checkbox"
                onChange={() => setCommunity((prev) => !prev)}
                checked={community}
              />
              I would like to share the questions with the community
            </label>
          )}
          <div className="button-container">
            <button disabled={disabled}>Submit</button>
            {pickedSubjectForEdit && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(true)}
                className="delete"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onDelete={deleteQuestionsHandler}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
      )}
    </>
  );
};

export default AddQuestionsForm;

// react questions url: https://github.com/sudheerj/reactjs-interview-questions
// react native questions url: https://github.com/samsoul16/react-native-interview-questions
// js questions url: https://github.com/sudheerj/javascript-interview-questions

import reactQuestions from "./questions/reactQuestions";
import reactNativeQuestions from "./questions/reactNativeQuestions";
import jsQuestions from "./questions/jsQuestions";
import personalQuestions from "./questions/personalQuestions";

// const types = ["React", "React Native", "JS", "Personal", "Random"];

const mappingQuestions = (questions, custom) => {
  let modifiedQuestions;

  if (custom) {
    modifiedQuestions = questions.split("\n");
  } else
    modifiedQuestions = questions.split(/\s\d+\s/).map((question) =>
      question
        .replace(/Q[0-9]+|“/gi, "")
        .replace("\t", "")
        .replace("\n", "")
        .replace(/[…]|-/g, " ")
    );
  return modifiedQuestions.filter((question) =>
    /[a-z\u0590-\u05fe]/gi.test(question)
  );
};

const questionsTypes = {
  React: mappingQuestions(reactQuestions),
  "React Native": mappingQuestions(reactNativeQuestions),
  JS: mappingQuestions(jsQuestions),
  Personal: mappingQuestions(personalQuestions),
};

const types = [...Object.keys(questionsTypes), "Random"];

export const addQuestions = (data) => {
  questionsTypes[data.subject] = mappingQuestions(data.questions, true);
  if (!types.includes(data.subject)) types.push(data.subject);
};

export const askQuestion = (type) => {
  if (type === "Random" && types.length === 0) {
    return "No questions left";
  }

  const randomIndex = Math.floor(Math.random() * types.length);
  const questionType = type === "Random" ? types[randomIndex] : type;
  const questions = questionsTypes[questionType];
  let i = Math.floor(Math.random() * questions.length);
  const question = questions[i];
  if (!question) {
    if (type === "Random") {
      types.splice(randomIndex, 1);
      return askQuestion(type);
    }
    return `No ${
      type === "reactNative" ? "react native" : type
    } questions left`;
  }
  questions.splice(i, 1);
  return question;
};

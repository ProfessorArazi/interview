// react questions url: https://github.com/sudheerj/reactjs-interview-questions
// react native questions url: https://github.com/samsoul16/react-native-interview-questions
// js questions url: https://github.com/sudheerj/javascript-interview-questions

import reactQuestions from "./questions/reactQuestions";
import reactNativeQuestions from "./questions/reactNativeQuestions";
import jsQuestions from "./questions/jsQuestions";
import personalQuestions from "./questions/personalQuestions";

const types = ["react", "reactNative", "js", "personal"];

const mappingQuestions = (questions) =>
  questions
    .split(/\s\d+\s/)
    .map((question) =>
      question
        .replace(/Q[0-9]+|“/gi, "")
        .replace("\t", "")
        .replace("\n", "")
        .replace(/[…]|-/g, " ")
    )
    .filter((question) => /[a-z]/gi.test(question));

const questionsTypes = {
  react: mappingQuestions(reactQuestions),
  reactNative: mappingQuestions(reactNativeQuestions),
  js: mappingQuestions(jsQuestions),
  personal: mappingQuestions(personalQuestions),
};

export const askQuestion = (type) => {
  const questionType =
    type === "random" ? types[Math.floor(Math.random() * 4)] : type;
  const questions = questionsTypes[questionType];
  let i = Math.floor(Math.random() * questions.length);
  const question = questions[i];
  if (!question) return `No ${type} questions left`;
  questions.splice(i, 1);
  return question;
};

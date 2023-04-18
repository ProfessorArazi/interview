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
  if (type === "random" && types.length === 0) {
    return "No questions left";
  }

  const randomIndex = Math.floor(Math.random() * types.length);
  const questionType = type === "random" ? types[randomIndex] : type;
  const questions = questionsTypes[questionType];
  let i = Math.floor(Math.random() * questions.length);
  const question = questions[i];
  if (!question) {
    if (type === "random") {
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

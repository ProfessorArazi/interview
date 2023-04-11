// react questions url: https://github.com/sudheerj/reactjs-interview-questions
// react native questions url: https://github.com/samsoul16/react-native-interview-questions
// js questions url: https://github.com/sudheerj/javascript-interview-questions

import reactQuestions from "./questions/reactQuestions";
import reactNativeQuestions from "./questions/reactNativeQuestions";
import jsQuestions from "./questions/jsQuestions";
import personalQuestions from "./questions/personalQuestions";

const mappingQuestions = (questions) =>
  questions
    .split(/\s\d+\s/)
    .map((question) =>
      question
        .replace("\t", "")
        .replace("\n", "")
        .replace(/Q[0-9]+|“/g, "")
        .replace(/[…]|-/g, " ")
    )
    .filter((question) => /[a-z]/gi.test(question));

const questionsTypes = {
  react: mappingQuestions(reactQuestions),
  reactNative: mappingQuestions(reactNativeQuestions),
  js: mappingQuestions(jsQuestions),
  personal: mappingQuestions(personalQuestions),
  random: mappingQuestions(
    reactQuestions + reactNativeQuestions + jsQuestions + personalQuestions
  ),
};

export const askQuestion = (type) => {
  const questions = questionsTypes[type];
  let i = Math.floor(Math.random() * questions.length);
  questions.splice(i, 1);
  return questions[i];
};

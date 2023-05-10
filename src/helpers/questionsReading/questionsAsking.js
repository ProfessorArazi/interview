// react questions url: https://github.com/sudheerj/reactjs-interview-questions
// react native questions url: https://github.com/samsoul16/react-native-interview-questions
// js questions url: https://github.com/sudheerj/javascript-interview-questions

import reactQuestions from "./questions/reactQuestions";
import reactNativeQuestions from "./questions/reactNativeQuestions";
import jsQuestions from "./questions/jsQuestions";
import personalQuestions from "./questions/personalQuestions";

const mappingQuestions = (questions, custom) => {
  let modifiedQuestions;

  if (custom) {
    modifiedQuestions = questions.split("\n");
  } else
    modifiedQuestions = questions
      .split(/\s\d+\s/)
      .map((question) =>
        question
          .replace(/Q[0-9]+|“/gi, "")
          .replace("\t", "")
          .replace("\n", "")
          .replace(/[…]|-/g, " ")
      )
      .filter((question) => /[a-z]/gi.test(question));
  return modifiedQuestions;
};

export let customTypes = {};
export let communityTypes = {};

let defaultTypes = {
  React: mappingQuestions(reactQuestions),
  "React Native": mappingQuestions(reactNativeQuestions),
  JS: mappingQuestions(jsQuestions),
  Personal: mappingQuestions(personalQuestions),
};

let questionsTypes = {
  ...defaultTypes,
};

let types = [...Object.keys(questionsTypes)];
export const updateQuestions = (data, community) => {
  const obj = {};
  data.forEach((q) => {
    obj[q.subject] = q.questions;
    if (!types.includes(q.subject)) types.push(q.subject);
  });
  if (community) {
    communityTypes = { ...obj };
  } else customTypes = { ...obj };
  questionsTypes = { ...defaultTypes, ...customTypes, ...communityTypes };
  types = [...Object.keys(questionsTypes)];
  return Object.keys(obj);
};

export const resetHandler = (showDefault, community) => {
  if (showDefault && community) {
    questionsTypes = { ...defaultTypes, ...customTypes, ...communityTypes };
  } else if (!showDefault && !community) {
    questionsTypes = { ...customTypes };
  } else if (!showDefault) {
    questionsTypes = { ...communityTypes, ...customTypes };
  } else if (!community) {
    questionsTypes = { ...defaultTypes, ...customTypes };
  }

  console.log(questionsTypes);
  types = [...Object.keys(questionsTypes)];
};

export const addQuestions = (data) => {
  const questions = [...mappingQuestions(data.questions, true)];
  questionsTypes[data.subject] = questions;
  customTypes[data.subject] = [...questionsTypes[data.subject]];
  types = [...Object.keys(questionsTypes)];
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

// react questions url: https://github.com/sudheerj/reactjs-interview-questions
// react native questions url: https://github.com/samsoul16/react-native-interview-questions
// js questions url: https://github.com/sudheerj/javascript-interview-questions

export let customTypes = [];
export let communityTypes = [];

export const updateQuestions = (data, type) => {
  const { questions, communityQuestions, id } = data;
  switch (type) {
    case "login":
      customTypes = questions;
      communityTypes = communityQuestions;
      return {
        customTypes,
        communityTypes,
      };
    case "customUpdate":
      customTypes = questions;
      return customTypes;
    case "addCommunity":
      communityTypes.push(...questions);
      return communityTypes;

    case "removeCommunity":
      const communityIndex = communityTypes.findIndex(
        (community) => community._id === id
      );
      communityTypes.splice(communityIndex, 1);
      return communityTypes;

    case "customCreate":
      customTypes.push({
        ...questions,
        questions: questions.questions.split("\n"),
        communityId: "",
        _id: Math.random(),
      });
      return customTypes;

    default:
      const index = customTypes.findIndex((custom) => custom._id === id);
      customTypes.splice(index, 1, {
        ...questions,
        questions: questions.questions.split("\n"),
        communityId: "",
        _id: Math.random(),
      });
      return customTypes;
  }
};

export const askQuestion = (type, communitySubjects, customSubjects) => {
  const allData = [...communitySubjects, ...customSubjects].filter(
    (data) => data.questions.length > 0
  );

  if (type === "Random" && allData.length === 0) {
    return "No questions left";
  }

  const randomIndex = Math.floor(Math.random() * allData.length);
  let questionsData =
    type === "Random"
      ? allData[randomIndex]
      : customSubjects.find((custom) => custom._id === type);
  if (!questionsData) {
    questionsData = communitySubjects.find(
      (community) => community._id === type
    );
  }

  if (!questionsData.questions) {
    if (type === "Random") {
      questionsData.questions.splice(randomIndex, 1);
      return askQuestion(type, communitySubjects, customSubjects);
    }
    return `No ${type} questions left`;
  }

  const { questions } = questionsData;
  const question = questions[0];
  if (!question) return `No ${questionsData.subject} questions left`;
  questions.splice(0, 1);
  return question;
};

export const getCustomQuestionsForEdit = (type) => {
  const customSubject = customTypes.find((custom) => custom._id === type);
  return {
    questions: customSubject.questions.join("\n"),
    subject: customSubject.subject,
  };
};

export const deleteQuestion = (id) => {
  const index = customTypes.findIndex((custom) => custom._id === id);
  customTypes.splice(index, 1);
  return customTypes;
};

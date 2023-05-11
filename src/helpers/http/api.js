import { updateQuestions } from "../questionsReading/questionsAsking";
import { httpRequest } from "./httpRequest";

const user = JSON.parse(localStorage.getItem("data"));

export const fetchQuestions = async (
  setIsLoading,
  setCustomSubjects,
  setIsAdmin,
  setPage
) => {
  if (user) {
    setIsLoading(true);
    const res = await httpRequest({
      method: "post",
      url: "/getQuestions",
      data: user,
    });
    const subjects = updateQuestions(res.questions);
    setCustomSubjects(subjects);
    if (res.isAdmin) {
      setIsAdmin(true);
      setPage("admin");
    }
    setIsLoading(false);
  }
};

export const addQuestionsRequest = async (data, values, community) => {
  httpRequest({
    method: "post",
    url: "/addQuestions",
    data: {
      ...data,
      questions: [{ ...values, questions: values.questions.split("\n") }],
      community,
    },
  });
};

export const loginOrSignup = async (
  signup,
  values,
  customQuestions,
  setIsLoading,
  setCustomSubjects,
  setIsAdmin,
  setPage
) => {
  const data = await httpRequest({
    method: "post",
    url: `/users${signup ? "" : "/login"}`,
    data: { ...values, questions: customQuestions },
  });
  if (!data.token) {
    setIsLoading(false);
    return "error";
  }
  if (!signup) {
    const subjects = updateQuestions(data.questions);
    setCustomSubjects(subjects);
  }

  localStorage.setItem(
    "data",
    JSON.stringify({ token: data.token, id: data.id })
  );

  if (data.isAdmin) {
    setIsAdmin(true);
  }

  setPage(data.isAdmin ? "admin" : "home");
};

export const getInvalidQuestions = async (setQuestions, setIsLoading) => {
  if (user) {
    const questions = await httpRequest({
      method: "post",
      url: "/community",
      data: { ...user, valid: false },
    });
    setQuestions(questions.questions);
    setIsLoading(false);
  }
};

export const approveQuestions = async (
  approvedQuestions,
  rejectedQuestions,
  closeAdmin
) => {
  httpRequest({
    method: "post",
    url: "/approveQuestions",
    data: {
      approved: approvedQuestions,
      rejected: rejectedQuestions,
      ...user,
    },
  });
  closeAdmin();
};

export const getCommunityHandler = async () => {
  const questions = await httpRequest({
    method: "post",
    url: "/community",
    data: {
      valid: true,
      ...user,
    },
  });
  return questions;
};

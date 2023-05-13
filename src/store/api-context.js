import { createContext } from "react";
import { toast } from "react-toastify";
import {
  customWithIds,
  updateQuestions,
} from "../helpers/questionsReading/questionsAsking";
import { httpRequest } from "../helpers/http/httpRequest";

export const ApiContext = createContext({
  setError: (data) => {},
  fetchQuestions: (data) => {},
  addQuestionsRequest: (data) => {},
  loginOrSignup: (data) => {},
  getInvalidQuestions: (data) => {},
  approveQuestions: (data) => {},
  getCommunityHandler: (data) => {},
  editQuestions: (data) => {},
});

export const ApiContextProvider = ({ children }) => {
  let user = JSON.parse(localStorage.getItem("data"));

  const setError = (message) =>
    toast.error(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

  const somethingWentWrongHandler = () => {
    setError("Something went wrong, Please try again");
  };

  const fetchQuestions = async (
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
      if (!res.questions) {
        return somethingWentWrongHandler();
      }
      const subjects = updateQuestions(res.questions);
      setCustomSubjects(subjects);
      if (res.isAdmin) {
        setIsAdmin(true);
        setPage("admin");
      }
      setIsLoading(false);
    }
  };

  const addQuestionsRequest = async (data, values, community) => {
    const res = await httpRequest({
      method: "post",
      url: "/addQuestions",
      data: {
        ...data,
        questions: [{ ...values, questions: values.questions.split("\n") }],
        community,
      },
    });
    customWithIds.push(res.question);
  };

  const loginOrSignup = async (
    signup,
    values,
    customQuestions,
    setIsLoading,
    setCustomSubjects,
    setIsAdmin,
    setPage,
    setError
  ) => {
    const data = await httpRequest({
      method: "post",
      url: `/users${signup ? "" : "/login"}`,
      data: { ...values, questions: customQuestions },
    });
    if (!data.token) {
      setError(
        data.userNameError?.kind === "unique"
          ? "User name already exist, Please choose another one"
          : data.error || "Something went wrong, Please try again"
      );
      return setIsLoading(false);
    }
    console.log(data.questions);
    const subjects = updateQuestions(data.questions);
    setCustomSubjects(subjects);

    localStorage.setItem(
      "data",
      JSON.stringify({ token: data.token, id: data.id })
    );

    if (data.isAdmin) {
      setIsAdmin(true);
    }

    setPage(data.isAdmin ? "admin" : "home");
    user = JSON.parse(localStorage.getItem("data"));
  };

  const getInvalidQuestions = async (setQuestions, setIsLoading) => {
    if (user) {
      const data = await httpRequest({
        method: "post",
        url: "/community",
        data: { ...user, valid: false },
      });
      if (!data.questions) return somethingWentWrongHandler();
      setQuestions(data.questions);
    }
    setIsLoading(false);
  };

  const approveQuestions = async (
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

  const getCommunityHandler = async () => {
    const questions = await httpRequest({
      method: "post",
      url: "/community",
      data: {
        valid: true,
        ...user,
      },
    });
    if (questions.message) return somethingWentWrongHandler();
    return questions;
  };

  const editQuestions = async (data, values, subjectId) => {
    httpRequest({
      method: "post",
      url: "/editQuestions",
      data: {
        ...data,
        questions: !values
          ? null
          : { ...values, questions: values.questions.split("\n") },
        subjectId,
      },
    });
  };

  const value = {
    setError,
    fetchQuestions,
    addQuestionsRequest,
    loginOrSignup,
    getInvalidQuestions,
    approveQuestions,
    getCommunityHandler,
    editQuestions,
    user,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

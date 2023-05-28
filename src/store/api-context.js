import { createContext } from "react";
import { toast } from "react-toastify";
import { updateQuestions } from "../helpers/questionsReading/questionsAsking";
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
    setCommunitySubjects,
    setIsAdmin,
    setPage
  ) => {
    if (user) {
      const res = await httpRequest({
        method: "post",
        url: "/getQuestions",
        data: user,
      });
      if (!res.questions) {
        return;
      }
      const { customTypes, communityTypes } = updateQuestions(res, "login");
      setCustomSubjects(customTypes);
      setCommunitySubjects(communityTypes);
      if (res.isAdmin) {
        setIsAdmin(true);
      } else {
        setPage("home");
      }
    } else {
      setPage("home");
    }
    setIsLoading(false);
  };

  const addQuestionsRequest = async (data, values, community) => {
    return await httpRequest({
      method: "post",
      url: "/addQuestions",
      data: {
        ...data,
        questions: [{ ...values, questions: values.questions.split("\n") }],
        community,
      },
    });
  };

  const loginOrSignup = async (
    signup,
    values,
    customQuestions,
    communityQuestions,
    setIsLoading,
    setCustomSubjects,
    setCommunitySubjects,
    setIsAdmin,
    setPage,
    setError
  ) => {
    const data = await httpRequest({
      method: "post",
      url: `/users${signup ? "" : "/login"}`,
      data: { ...values, questions: customQuestions, communityQuestions },
    });
    if (!data.token) {
      setError(
        data.userNameError?.kind === "unique"
          ? "User name already exist, Please choose another one"
          : data.error || "Something went wrong, Please try again"
      );
      return setIsLoading(false);
    }
    const { customTypes, communityTypes } = updateQuestions(data, "login");
    setCustomSubjects(customTypes);
    setCommunitySubjects(communityTypes);

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

  const getCommunityHandler = async (id) => {
    const questions = await httpRequest({
      method: "post",
      url: "/community",
      data: {
        communityId: id,
        ...user,
        valid: true,
      },
    });
    if (questions.message) return somethingWentWrongHandler();
    return questions;
  };

  const removeCommunityHandler = async (id) => {
    if (!user) return;
    const questions = await httpRequest({
      method: "post",
      url: "/community/remove",
      data: {
        communityId: id,
        ...user,
        valid: true,
      },
    });
    if (questions.message) return somethingWentWrongHandler();
    return questions;
  };

  const getCommunityKeysHandler = async (setLoading) => {
    const keys = await httpRequest({
      method: "post",
      url: "/community/keys",
      data: {
        ...user,
      },
    });
    setLoading(false);
    if (keys.message) return;
    return keys;
  };

  const editQuestions = async (data, values, subjectId) => {
    const res = await httpRequest({
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
    const subjects = updateQuestions(
      { questions: res.questions, communityQuestions: res.communityQuestions },
      "login"
    );
    return subjects.customTypes;
  };

  const value = {
    setError,
    fetchQuestions,
    addQuestionsRequest,
    loginOrSignup,
    getInvalidQuestions,
    approveQuestions,
    getCommunityHandler,
    getCommunityKeysHandler,
    removeCommunityHandler,
    editQuestions,
    user,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

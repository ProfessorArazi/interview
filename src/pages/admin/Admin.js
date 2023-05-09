import React, { useEffect, useState } from "react";
import { httpRequest } from "../../helpers/http/httpRequest";

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [rejectedQuestions, setRejectedQuestions] = useState([]);

  useEffect(() => {
    const getInvalidQuestions = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      if (data) {
        const questions = await httpRequest({
          method: "post",
          url: "/community",
          data: { ...data, valid: false },
        });
        setQuestions(questions);
      }
    };

    getInvalidQuestions();
  }, []);

  return <div>Admin</div>;
};

export default Admin;

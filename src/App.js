import { useEffect, useState } from "react";
import "./App.css";
import Home from "./home/Home";
import AddQuestionsForm from "./components/forms/AddQuestionsForm";
import Login from "./components/forms/Login";
import { httpRequest } from "./helpers/http/httpRequest";
import { updateQuestions } from "./helpers/questionsReading/questionsAsking";
import LoadingSpinner from "./components/loading/LoadingSpinner";

function App() {
  const [page, setPage] = useState("home");
  const subjects = ["React", "React Native", "JS", "Personal", "Random"];
  const [customSubjects, setCustomSubjects] = useState([]);
  const [showDefaultSubjects, setShowDefaultSubjects] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      if (data) {
        setIsLoading(true);
        const res = await httpRequest({
          method: "post",
          url: "/getQuestions",
          data,
        });
        const subjects = updateQuestions(res.questions);
        setCustomSubjects(subjects);
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingSpinner />
      ) : page === "form" ? (
        <AddQuestionsForm
          screenWidth={screenWidth}
          setCustomSubjects={setCustomSubjects}
          closeForm={() => setPage("home")}
        />
      ) : page === "login" ? (
        <Login
          setCustomSubjects={setCustomSubjects}
          screenWidth={screenWidth}
          closeLogin={() => setPage("home")}
        />
      ) : (
        <Home
          screenWidth={screenWidth}
          subjects={
            showDefaultSubjects
              ? [...subjects, ...customSubjects]
              : customSubjects
          }
          setPage={setPage}
          setShowDefaultSubjects={setShowDefaultSubjects}
          showDefaultSubjects={showDefaultSubjects}
        />
      )}
    </div>
  );
}

export default App;

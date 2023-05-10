import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import AddQuestionsForm from "./components/forms/AddQuestionsForm";
import Login from "./components/forms/Login";
import LoadingSpinner from "./components/loading/LoadingSpinner";
import Admin from "./pages/admin/Admin";
import { fetchQuestions } from "./helpers/http/api";

function App() {
  const [page, setPage] = useState("home");
  const subjects = ["React", "React Native", "JS", "Personal", "Random"];
  const [customSubjects, setCustomSubjects] = useState([]);
  const [communitySubjects, setCommunitySubjects] = useState([]);
  const [showDefaultSubjects, setShowDefaultSubjects] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    fetchQuestions(setIsLoading, setCustomSubjects, setIsAdmin, setPage);
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
      ) : isAdmin && page === "admin" ? (
        <Admin closeAdmin={() => setPage("home")} screenWidth={screenWidth} />
      ) : page === "form" ? (
        <AddQuestionsForm
          screenWidth={screenWidth}
          setCustomSubjects={setCustomSubjects}
          closeForm={() => setPage("home")}
        />
      ) : page === "login" ? (
        <Login
          setIsAdmin={setIsAdmin}
          setCustomSubjects={setCustomSubjects}
          screenWidth={screenWidth}
          setPage={setPage}
        />
      ) : (
        <Home
          isAdmin={isAdmin}
          screenWidth={screenWidth}
          subjects={[...customSubjects, ...subjects, ...communitySubjects]}
          setPage={setPage}
          setShowDefaultSubjects={setShowDefaultSubjects}
          showDefaultSubjects={showDefaultSubjects}
          setCommunitySubjects={setCommunitySubjects}
          community={communitySubjects}
        />
      )}
    </div>
  );
}

export default App;

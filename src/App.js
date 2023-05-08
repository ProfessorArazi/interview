import { useEffect, useState } from "react";
import "./App.css";
import Home from "./home/Home";
import AddQuestionsForm from "./components/forms/AddQuestionsForm";
import Login from "./components/forms/Login";

function App() {
  const [page, setPage] = useState("home");
  const subjects = ["React", "React Native", "JS", "Personal", "Random"];
  const [customSubjects, setCustomSubjects] = useState([]);
  const [showDefaultSubjects, setShowDefaultSubjects] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      {page === "form" ? (
        <AddQuestionsForm
          screenWidth={screenWidth}
          setCustomSubjects={setCustomSubjects}
          closeForm={() => setPage("home")}
        />
      ) : page === "login" ? (
        <Login screenWidth={screenWidth} closeLogin={() => setPage("home")} />
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

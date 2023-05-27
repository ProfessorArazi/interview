import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import AddQuestionsForm from "./components/forms/AddQuestionsForm";
import Login from "./components/forms/Login";
import LoadingSpinner from "./components/loading/LoadingSpinner";
import Admin from "./pages/admin/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiContextProvider } from "./store/api-context";
import Layout from "./components/layout/Layout";

function App() {
  const synth = window.speechSynthesis;

  const [voices, setVoices] = useState([]);
  const [page, setPage] = useState("admin");
  const [customSubjects, setCustomSubjects] = useState([]);
  const [communitySubjects, setCommunitySubjects] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    const fetchVoices = async () => {
      const voices = await synth.getVoices();
      setVoices(voices);
    };

    fetchVoices();
  }, [synth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <ApiContextProvider>
      <Layout
        setIsLoading={setIsLoading}
        setCustomSubjects={setCustomSubjects}
        setCommunitySubjects={setCommunitySubjects}
        setIsAdmin={setIsAdmin}
        setPage={setPage}
      >
        <div className="App">
          <ToastContainer />
          {isLoading ? (
            <LoadingSpinner />
          ) : isAdmin && page === "admin" ? (
            <Admin
              closeAdmin={() => setPage("home")}
              screenWidth={screenWidth}
            />
          ) : page === "form" || page === "edit" ? (
            <AddQuestionsForm
              screenWidth={screenWidth}
              setCustomSubjects={setCustomSubjects}
              closeForm={() => setPage("home")}
              customSubjects={page === "edit" ? customSubjects : null}
            />
          ) : page === "login" ? (
            <Login
              setIsAdmin={setIsAdmin}
              setCustomSubjects={setCustomSubjects}
              setCommunitySubjects={setCommunitySubjects}
              screenWidth={screenWidth}
              setPage={setPage}
              customQuestions={customSubjects}
              communityQuestions={communitySubjects}
            />
          ) : (
            page === "home" && (
              <Home
                setPage={setPage}
                communitySubjects={communitySubjects}
                setCommunitySubjects={setCommunitySubjects}
                screenWidth={screenWidth}
                isAdmin={isAdmin}
                customSubjects={customSubjects}
                voices={voices}
              />
            )
          )}
        </div>
      </Layout>
    </ApiContextProvider>
  );
}

export default App;

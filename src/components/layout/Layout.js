import { useContext, useEffect } from "react";
import { ApiContext } from "../../store/api-context";

const Layout = ({
  setIsLoading,
  setCustomSubjects,
  setCommunitySubjects,
  setIsAdmin,
  setPage,
  children,
}) => {
  const { fetchQuestions } = useContext(ApiContext);

  useEffect(() => {
    const firstFetchHandler = async () => {
      await fetchQuestions(
        setIsLoading,
        setCustomSubjects,
        setCommunitySubjects,
        setIsAdmin,
        setPage
      );
    };
    setIsLoading(true);
    firstFetchHandler();
  }, []);

  return children;
};

export default Layout;

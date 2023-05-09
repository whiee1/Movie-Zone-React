import CardList from "../components/CardList";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";
import Pagination from "../components/ui/Pagination";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Home = () => {
  const context = useContext(AuthContext);

  const {
    page,
    getMovies,
    setPage,
    searchResults,
    setSearchResults,
    totalPages,
  } = context;

  if (searchResults) {
    setSearchResults("");
  }

  useEffect(() => {
    getMovies();
  }, [page]); // add page state to the dependency array

  return (
    <>
      <CardList />
      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default Home;

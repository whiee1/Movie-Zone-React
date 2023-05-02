import CardList from "../components/CardList";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import MovieZone from "../components/ui/MovieZone";

const Home = () => {
  const context = useContext(AuthContext);

  const { page, getMovies } = context;

  if (context.searchResults) {
    context.setSearchResults();
  }

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <>
      <MovieZone />
      <CardList />
    </>
  );
};

export default Home;

import CardList from "../components/CardList";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";
import Pagination from "../components/ui/Pagination";

const Home = () => {
  const context = useContext(AuthContext);

  const { page, getMovies, setPage, searchResults, setSearchResults } = context;
  //När home renderas så sätts searchResults till tom sträng för att inte rendera fel filmer
  if (searchResults) {
    setSearchResults("");
  }
  //Hämtar filmer när page ändras
  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <>
      <CardList />
      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default Home;

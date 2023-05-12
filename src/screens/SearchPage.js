import CardList from "../components/CardList";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";
import Pagination from "../components/ui/Pagination";

// Hämtar filmer med användarens sökning
const SearchPage = () => {
  const context = useContext(AuthContext);
  const { getMovies, searchKey, searchPage, setSearchPage } = context;

  useEffect(() => {
    getMovies(searchKey);
  }, [searchPage, searchKey]); // Körs när searchPage eller  searchKey ändrar värde.

  return (
    <>
      <CardList />;
      <Pagination page={searchPage} setPage={setSearchPage} />
    </>
  );
};
export default SearchPage;

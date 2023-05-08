import CardList from "../components/CardList";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../components/store/auth_context";
import Pagination from "../components/ui/Pagination";

const SearchPage = () => {
  const context = useContext(AuthContext);
  const {
    page,
    getMovies,
    setPage,
    searchKey,
    searchPage,
    setSearchPage,
    totalPages,
  } = context;

  useEffect(() => {
    getMovies(searchKey, "search");
  }, [searchPage, searchKey]); // add page and searchKey states to the dependency array

  return (
    <>
      <CardList />;
      <Pagination page={searchPage} setPage={setSearchPage} />
    </>
  );
};
export default SearchPage;

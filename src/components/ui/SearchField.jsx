import { useState, useContext } from "react";
import AuthContext from "../store/auth_context";

const SearchField = () => {
  const context = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState("");

  const search = (e) => {
    e.preventDefault();
    context.getMovies(searchKey);
  };

  return (
    <>
      <form onSubmit={(e) => search(e)}>
        <label className="searchLabel" htmlFor="searchInputField">
          Search for movies
        </label>
        <input
          type="text"
          placeholder="Write a movie title"
          id="searchInputField"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit">Search </button>
      </form>
    </>
  );
};

export default SearchField;

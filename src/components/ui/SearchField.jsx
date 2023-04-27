import { useState, useContext } from "react";
import AuthContext from "../store/auth_context";
import { Link, useNavigate } from "react-router-dom";

const SearchField = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");

  const search = (e) => {
    e.preventDefault();
    context
      .getMovies(searchKey)
      .then(() => setSearchKey(""), navigate("/home"))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={search}>
        <label className="searchLabel" htmlFor="searchInputField">
          Search for movies
        </label>
        <input
          type="text"
          placeholder="Write a movie title"
          id="searchInputField"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit">Search </button>
      </form>
    </>
  );
};

export default SearchField;

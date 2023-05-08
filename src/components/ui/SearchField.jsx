import { useState, useContext } from "react";
import AuthContext from "../store/auth_context";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [key, setKey] = useState("");

  const search = (e) => {
    e.preventDefault();
    context.setSearchPage(1);
    context.setSearchKey(key);

    context
      .getMovies(key)
      .then(() => navigate(`/search/:${key}`), setKey(""))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={search}>
        <label className="searchLabel" htmlFor="searchInputField">
          Search for movies
        </label>
        <input
          className="searchField"
          type="text"
          placeholder="Search for movies"
          id="searchInputField"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button className="searchBtn navBtn">
          <i className="fa fa-search"></i>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchField;

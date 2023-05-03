import { useState, useContext } from "react";
import AuthContext from "../store/auth_context";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");

  const search = (e) => {
    e.preventDefault();
    context
      .getMovies(searchKey)
      .then(() => navigate(`/search/:searchKey`), setSearchKey(""))
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
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="navBtn" type="submit">
          <i className="fa fa-search"></i>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchField;

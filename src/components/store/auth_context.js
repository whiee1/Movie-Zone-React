import React, { useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext({
  movies: [],
  setMovies: {},

  getMovies: () => {},

  clickedMovie: {},
  setClickedMovie: {},
});

export const AuthContextProvider = (props) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [clickedMovie, setClickedMovie] = useState();

  // const [showDetailPage, setShowDetailPage] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState();

  //Funktionen skickar begäran med Axios till TMDb API med URL-baserad på om användaren söker efter filmer eller kollar på upptäckts-sidan. Beroende på vilket, skickas lämpliga parametrar i begäran, inklusive API-nyckeln, sökk-sträng eller sidnumret.
  const getMovies = async (key) => {
    const type = key ? "search" : "discover";

    const { data } = await axios.get(`${API_URL}/${type}/movie?`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
        page: type === "search" ? searchPage : page,
        // använd sid nummer beroende på typ
      },
    });
    // sätt hur många sidor som finns att hämta och till vilket state hämtningen ska sparas
    setTotalPages(data.total_pages);
    if (type === "search") {
      setSearchResults(data.results);
    } else {
      setMovies(data.results);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getMovies,
        page,
        setPage,

        movies,
        setMovies,

        clickedMovie,
        setClickedMovie,
        // showDetailPage,
        // setShowDetailPage,

        searchResults,
        setSearchResults,

        searchPage,
        setSearchPage,
        searchKey,
        setSearchKey,
        totalPages,
        setTotalPages,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

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
  //ta bort sen
  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [clickedMovie, setClickedMovie] = useState();

  const [showDetailPage, setShowDetailPage] = useState(false);

  const [searchResults, setSearchResults] = useState();
  const [searchPage, setSearchPage] = useState(1);

  const [searchKey, setSearchKey] = useState("");

  //Functions
  const getMovies = async (key) => {
    const type = key ? "search" : "discover";

    const { data /* SKRIV KOMMENTAR    */ } = await axios.get(
      `${API_URL}/${type}/movie?`,
      {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: type === "search" ? searchPage : page,
          // set the correct page number based on whether it is a search or home page
        },
      }
    );
    // sätt hur många sidor som finns att hämta
    setTotalPages(data.total_pages);
    if (type === "search") {
      setSearchResults(data.results);
    } else {
      setMovies(data.results);
    }
  };

  // const getMovies = () => {
  //   console.log("kolla", API_KEY + API_URL);

  //   Promise.all([
  //     fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&page=${page}`),
  //     fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&page=${page + 1}`),
  //   ])
  //     .then(([response1, response2]) =>
  //       Promise.all([response1.json(), response2.json()])
  //     )
  //     .then(([data1, data2]) => {
  //       setMovies((prevMovies) => [
  //         ...prevMovies,
  //         ...data1.results,
  //         ...data2.results,
  //       ]);
  //       setPage(page + 2);
  //     })
  //     .catch((error) => console.log(error));
  // };

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
        showDetailPage,
        setShowDetailPage,

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

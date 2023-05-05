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
  const adress =
    "https://api.themoviedb.org/3/discover/movie?api_key=1c938d93f52a6f0cd2477a8a7b76ba54&page=2";

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  const [clickedMovie, setClickedMovie] = useState();

  const [showDetailPage, setShowDetailPage] = useState(false);

  const [searchResults, setSearchResults] = useState();

  //Functions
  const getMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results } /* SKRIV KOMMENTAR    */,
    } = await axios.get(`${API_URL}/${type}/movie?`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
        // page: page,
      },
    });

    if (type === "search") {
      setSearchResults(results);
    } else {
      setMovies(results);
    }
  };

  console.log({ searchResults });

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import Hero from "../components/ui/Hero";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../components/store/auth_context";
import UserAuthContext from "../components/store/user_auth_context";
import Back from "../components/ui/Back";

const MovieDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //key value par för genre och värden fårn API:et
  const movieGenre = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };

  const context = useContext(AuthContext);
  const userContext = useContext(UserAuthContext);

  const movie = context.clickedMovie;
  //Funktionen används för att kontrollera om filmen finns i listan.
  const isMovieSaved = (movie) => {
    return userContext.savedMovieList.some(
      (savedMovie) => savedMovie.id === movie.id
    );
  };
  const [savedMovie, setSavedMovie] = useState(isMovieSaved(movie));
  const [forceUpdate, setForceUpdate] = useState(false);

  //Funktion för att lägga till eller ta bort en film beroende på om den redan finns där eller inte. setSavedMovie används för att uppdatera state-variabeln och forceUpdate används för att tvinga en uppdatering av komponenten när en film läggs till eller tas bort från listan.
  const handleClick = () => {
    if (savedMovie) {
      userContext.removeMovieFromList(movie);
      setSavedMovie(false);
      setForceUpdate(!forceUpdate); // update the state of forceUpdate variable
    } else {
      userContext.addMoviesToList(movie);
      setSavedMovie(true);
      setForceUpdate(!forceUpdate); // update the state of forceUpdate variable
    }
  };
  return (
    <article className="detailPage">
      <Back />
      <Hero movie={movie} />

      <>
        <div className="infoContainer">
          <h2>{movie.title}</h2>

          <button
            className="saveMovieBtn"
            onClick={handleClick}
            style={{
              color: "white",
            }}
          >
            {savedMovie ? "Remove from list" : "Add to list"}
          </button>
          <article className="infoWrapper">
            <section className="container">
              <div className="release">
                <span className="title">Release date: </span>
                <span>{movie.release_date}</span>
              </div>
              {/* funktion som itererar över en array av genre-ID:n för en film, För varje genre-ID letar funktionen upp dess motsvarande genre-namn i "movieGenre"-objektet Om en matchning hittas tilldelas det matchande genre-namnet till variabeln "genreName". */}

              <ul>
                <span className="title">Genres:</span>
                {movie.genre_ids?.map((genreId, i) => {
                  const genreName = Object.keys(movieGenre).find(
                    (key) => movieGenre[key] === genreId
                  );
                  if (genreName) {
                    return <li key={i}>{genreName}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </section>
            <section className="overview">
              <span className="title"> Overview:</span>

              <p>{movie.overview}</p>
            </section>
          </article>
        </div>
        {/* tomt objekt för att tvinga rendering  */}
        {forceUpdate && <></>}
      </>
    </article>
  );
};

export default MovieDetails;

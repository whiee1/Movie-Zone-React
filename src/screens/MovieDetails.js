import Hero from "../components/ui/Hero";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../components/store/auth_context";
import UserAuthContext from "../components/store/user_auth_context";
import Back from "../components/ui/Back";

const MovieDetails = () => {
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
  // const context = useContext(AuthContext);
  // const userContext = useContext(UserAuthContext);

  // const movie = context.clickedMovie;
  // const isMovieSaved = (movie) => {
  //   return userContext.savedMovieList.some(
  //     (savedMovie) => savedMovie.id === movie.id
  //   );
  // };
  // const [savedMovie, setSavedMovie] = useState(isMovieSaved(movie));

  // const handleClick = () => {
  //   if (savedMovie) {
  //     userContext.removeMovieFromList(movie);
  //     setSavedMovie(false);
  //   } else {
  //     userContext.addMoviesToList(movie);
  //     setSavedMovie(true);
  //   }
  //   // force a re-render of the component

  //   // Update the savedMovie state based on the updated likedMovies
  //   const isSaved = isMovieSaved(movie);
  //   setSavedMovie(isSaved);
  // };

  // const [savedMovie, setSavedMovie] = useState(isMovieSaved(movie));

  // useEffect(() => {
  //   userContext
  //     .getLikedMovies()
  //     .then((res) => userContext.setSavedMovieList(res.likedMovies));
  // }, []);

  // const handleClick = async () => {
  //   if (!savedMovie) {
  //     await userContext.addMoviesToList(movie);
  //   } else {
  //     await userContext.removeMovieFromList(movie);
  //   }
  //   const isSaved = isMovieSaved(movie);
  //   console.log({ isSaved });
  //   setSavedMovie(isSaved);
  // };

  const context = useContext(AuthContext);
  const userContext = useContext(UserAuthContext);

  const movie = context.clickedMovie;
  const isMovieSaved = (movie) => {
    return userContext.savedMovieList.some(
      (savedMovie) => savedMovie.id === movie.id
    );
  };
  const [savedMovie, setSavedMovie] = useState(isMovieSaved(movie));
  const [forceUpdate, setForceUpdate] = useState(false);

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
    <>
      <Back />
      <Hero movie={movie} />

      <>
        <div className="infoContainer">
          <h2>{movie.title}</h2>

          <button
            className="saveMovieBtn"
            onClick={handleClick}
            style={{
              // backgroundColor: savedMovie ? "red" : "green",
              color: "white",
            }}
          >
            {savedMovie ? "Remove from list" : "Add to list"}
          </button>
          <article className="infoWrapper">
            <div className="release">
              <span>Release date: </span>
              <span>{movie.release_date}</span>
            </div>

            <ul>
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
            <section className="overview">
              {" "}
              Overview:
              <p>{movie.overview}</p>
            </section>
          </article>
        </div>
        {/* tomt objekt för att tvinga rendering  */}
        {forceUpdate && <></>}
      </>
    </>
  );

  // return (
  //   <>
  //     <Back />
  //     <Hero movie={movie} />

  //     <>
  //       <div className="infoContainer">
  //         <h2>{movie.title}</h2>

  //         <button
  //           onClick={handleClick}
  //           style={{
  //             backgroundColor: savedMovie ? "green" : "red",
  //             color: "white",
  //           }}
  //         >
  //           {savedMovie ? "Saved" : "Save"}
  //         </button>
  //         <article className="infoWrapper">
  //           <div className="release">
  //             <span>Release date: </span>
  //             <span>{movie.release_date}</span>
  //           </div>

  //           <ul>
  //             {movie.genre_ids?.map((genreId, i) => {
  //               const genreName = Object.keys(movieGenre).find(
  //                 (key) => movieGenre[key] === genreId
  //               );
  //               if (genreName) {
  //                 return <li key={i}>{genreName}</li>;
  //               } else {
  //                 return null;
  //               }
  //             })}
  //           </ul>
  //           <section className="overview">
  //             {" "}
  //             Overview:
  //             <p>{movie.overview}</p>
  //           </section>
  //         </article>
  //       </div>
  //     </>
  //   </>
  // );

  // return (
  //   <>
  //     <Back />
  //     {/* <Hero movie={movie} /> */}
  //     <div className="heroContainer">
  //       {movie && movie.backdrop_path && (
  //         <>
  //           <img
  //             className="heroImage"
  //             src={IMAGE_PATH + movie.backdrop_path}
  //             alt="Movie poster"
  //           />
  //           <div className="infoContainer">
  //             <h2>{movie.title}</h2>
  //             <article className="infoWrapper">
  //               <div>
  //                 <span>Release: {movie.release_date}</span>
  //               </div>

  //               <ul>
  //                 {movie.genre_ids?.map((genreId, i) => {
  //                   const genreName = Object.keys(movieGenre).find(
  //                     (key) => movieGenre[key] === genreId
  //                   );
  //                   if (genreName) {
  //                     return <li key={i}>{genreName}</li>;
  //                   } else {
  //                     return null;
  //                   }
  //                 })}
  //               </ul>
  //               <section className="overview">
  //                 {" "}
  //                 Overview:
  //                 <p>{movie.overview}</p>
  //               </section>
  //             </article>
  //           </div>

  //           {/* <h2 className="heroTitle">{movie.title}</h2> */}
  //         </>
  //       )}
  //     </div>
  //   </>
  // );
};

export default MovieDetails;

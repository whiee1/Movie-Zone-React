import Hero from "../components/ui/Hero";
import { useContext } from "react";
import AuthContext from "../components/store/auth_context";

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

  const context = useContext(AuthContext);

  const movie = context.clickedMovie;
  console.log(movie);

  return (
    <>
      <Back />
      <Hero movie={movie} />

      <>
        <div className="infoContainer">
          <h2>{movie.title}</h2>
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
      </>
    </>
  );

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

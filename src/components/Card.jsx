import { useContext } from "react";
import AuthContext from "./store/auth_context";
import MovieDetails from "../screens/MovieDetails";
import { useNavigate } from "react-router-dom";
export const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

const Card = (props) => {
  const { movie } = props;
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    await context.setClickedMovie(movie);
    navigate(`/movie/${movie.title}`);
  };

  return (
    <>
      {context.showMovieDetails && <MovieDetails />}

      <div className="cardContainer" onClick={handleClick}>
        {movie.poster_path && (
          <>
            <img
              className="bild"
              src={IMAGE_PATH + movie.poster_path}
              alt="Movie poster"
            />
            <div className="titleWrapper">
              <h2>{movie.title}</h2>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;

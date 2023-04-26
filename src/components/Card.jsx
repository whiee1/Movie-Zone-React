import { useContext } from "react";
import AuthContext from "./store/auth_context";
import MovieDetails from "../screens/MovieDetails";
export const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

const Card = (props) => {
  const context = useContext(AuthContext);
  const { movie } = props;

  const handleClick = () => {
    console.log("klickad");
    context.setClickedMovie(movie);
  };

  return (
    <div className="cardContainer" onClick={handleClick}>
      {movie.poster_path && (
        <>
          <img
            className="bild"
            src={IMAGE_PATH + movie.poster_path}
            alt="Movie poster"
          />
          <div className="titleWrapper">
            <h1>{movie.title}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;

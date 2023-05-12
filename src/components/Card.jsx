import { useContext } from "react";
import AuthContext from "./store/auth_context";
import { useNavigate } from "react-router-dom";
export const CARD_IMAGE_PATH = process.env.REACT_APP_CARD_IMAGE_PATH;
//Komponenten par emot en film från <CardList/> och vid klick sparas filmen i clickedMovie i context, där MovieDetails sidan hämtar clickedMovie
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
      <div className="cardContainer" onClick={handleClick}>
        {movie.poster_path && (
          <>
            <img
              className="bild"
              src={CARD_IMAGE_PATH + movie.poster_path}
              alt="Movie poster"
            />

            <div className="cardTextWrapper">
              <span className="cardMovieTitle">{movie.title}</span>

              <div className="smallInfoWrapper">
                <span>{movie.release_date}</span>
                <span>
                  <i className="fa fa-star rating"></i>
                  {/* toFixed för att få ett heltal */}
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;

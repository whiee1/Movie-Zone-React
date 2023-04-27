import Card from "./Card";
import { useContext } from "react";
import AuthContext from "./store/auth_context";

const CardList = () => {
  const context = useContext(AuthContext);

  console.log("context movies", context.movies);
  console.log("context searched movie", context.searchResults);

  const renderMovies = () => {
    return (
      <div className="moviesContainer">
        {(context.searchResults || context.movies).map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    );
  };

  return <>{renderMovies()}</>;
};
export default CardList;

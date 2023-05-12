import Card from "./Card";
import { useContext } from "react";
import AuthContext from "./store/auth_context";

//Komponenten renderar en lista av Card-komponenter för varje film som ska visas. Om sökresultat finns, renderas dessa, annars renderas populära filmer.
const CardList = () => {
  const context = useContext(AuthContext);

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

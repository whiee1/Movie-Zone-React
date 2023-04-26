import Card from "./Card";
import { useEffect, useContext } from "react";
import AuthContext from "./store/auth_context";

const CardList = (props) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.getMovies();
  }, []);
  console.log(context.movies);

  return (
    <div className="moviesContainer">
      {context.movies?.map((movie, i) => {
        return <Card movie={movie} key={movie.id} />;
      })}
    </div>
  );
};
export default CardList;

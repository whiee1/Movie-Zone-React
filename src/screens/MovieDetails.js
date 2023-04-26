import Hero from "../components/ui/Hero";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";

const MovieDetails = () => {
  const context = useContext(AuthContext);

  const movie = context.clickedMovie;

  console.log(movie);

  return (
    <>
      <Hero movie={movie} />
      <h1></h1>
    </>
  );
};

export default MovieDetails;

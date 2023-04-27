import Hero from "../components/ui/Hero";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";

const MovieDetails = () => {
  const context = useContext(AuthContext);

  const movie = context.clickedMovie;

  return (
    <>
      <Hero movie={movie} />
    </>
  );
};

export default MovieDetails;

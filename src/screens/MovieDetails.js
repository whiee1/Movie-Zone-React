import Hero from "../components/ui/Hero";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";

import Back from "../components/ui/Back";

const MovieDetails = () => {
  const context = useContext(AuthContext);

  const movie = context.clickedMovie;

  return (
    <>
      <Back />
      <Hero movie={movie} />
    </>
  );
};

export default MovieDetails;

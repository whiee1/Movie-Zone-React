const Hero = (props) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const { movie } = props;

  return (
    <header className="heroContainer">
      {movie && movie.backdrop_path && (
        <>
          <img
            className="heroImage"
            src={IMAGE_PATH + movie.backdrop_path}
            alt="Movie poster"
          />
          <h2 className="heroTitle">{movie.title}</h2>
        </>
      )}
    </header>
  );
};
export default Hero;

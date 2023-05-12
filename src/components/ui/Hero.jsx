//Komponent som visar stor bild på detalj sidan om det finns någon

const Hero = (props) => {
  const HERO_IMAGE_PATH = process.env.REACT_APP_HERO_IMAGE_PATH;
  const { movie } = props;

  return (
    <header className="heroContainer">
      {movie && movie.backdrop_path && (
        <>
          <img
            className="heroImage"
            src={HERO_IMAGE_PATH + movie.backdrop_path}
            alt="Movie poster"
          />
        </>
      )}
    </header>
  );
};
export default Hero;

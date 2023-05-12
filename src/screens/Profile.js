import Card from "../components/Card";
import { useEffect, useContext } from "react";
import UserAuthContext from "../components/store/user_auth_context";

// Hämtar in sparade filmer från användarens databas och sätter savedMovieList till responsen.likedMovies.
const Profile = () => {
  const context = useContext(UserAuthContext);
  const { setSavedMovieList, savedMovieList, getLikedMovies } = context;
  useEffect(() => {
    getLikedMovies().then((res) => setSavedMovieList(res.likedMovies));
  }, []);

  //Om likedMovied inte är tom, mappa över filmerna
  const renderList = () => {
    if (savedMovieList && savedMovieList.length > 0) {
      return savedMovieList?.map((movie) => (
        <div>
          <Card movie={movie} key={movie.id} />
        </div>
      ));
    } else {
      return <p> You have no movies in your list</p>;
    }
  };
  return (
    <article className="profile">
      <h2>Saved Movies</h2>
      <div className="moviesContainer">{renderList()}</div>
    </article>
  );
};
export default Profile;

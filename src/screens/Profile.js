import Card from "../components/Card";
import { useEffect, useContext, useState } from "react";
import UserAuthContext from "../components/store/user_auth_context";

const Profile = () => {
  // const [savedMovieList, setSavedMovieList] = useState();
  const context = useContext(UserAuthContext);
  const { setSavedMovieList, savedMovieList } = context;
  useEffect(() => {
    context
      .getLikedMovies()
      .then((res) => context.setSavedMovieList(res.likedMovies));
  }, []);

  console.log(context.savedMovieList);
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

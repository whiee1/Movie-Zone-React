import CardList from "../components/CardList";
import { useEffect, useContext } from "react";
import AuthContext from "../components/store/auth_context";

const Home = () => {
  const context = useContext(AuthContext);
  useEffect(() => {
    context.getMovies();
  }, []);
  return (
    <>
      <CardList />
    </>
  );
};

export default Home;

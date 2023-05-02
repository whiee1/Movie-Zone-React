import CardList from "../components/CardList";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../components/store/auth_context";

import Back from "../components/ui/Back";

const SearchPage = () => {
  const context = useContext(AuthContext);
  const { page, getMovies } = context;

  // useEffect(() => {
  //   getMovies();
  // }, [page]);

  return (
    <>
      <Back />
      <CardList />;
    </>
  );
};
export default SearchPage;

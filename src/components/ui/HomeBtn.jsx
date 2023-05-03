import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth_context";

const HomeBtn = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    context.getMovies();
    navigate("/");
  };

  return (
    <button className="homeBtn" onClick={handleClick}>
      Home
    </button>
  );
};
export default HomeBtn;

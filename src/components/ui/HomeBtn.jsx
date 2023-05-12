import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth_context";

//Klickar man på knappen skickas man till home sidan och sid numret på pagination sätts om till 1
const HomeBtn = ({ handleShowNavbar }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    handleShowNavbar && handleShowNavbar();
    context.setPage(1);
    context.getMovies();
    navigate("/");
  };

  return (
    <button className="homeBtn navBtn" onClick={handleClick}>
      Home
    </button>
  );
};
export default HomeBtn;

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth_context";

const LoginBtn = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return <button onClick={handleClick}>Log In</button>;
};
export default LoginBtn;

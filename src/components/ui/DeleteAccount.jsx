import UserAuthContext from "../store/user_auth_context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const context = useContext(UserAuthContext);

  const handleClick = async () => {
    const response = await context.deleteAccount();
    response.success && navigate("/login");
  };

  return (
    <button className="navBtn" onClick={handleClick}>
      Delete Account
    </button>
  );
};
export default DeleteAccount;

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      className="navBtn profileBtn"
      onClick={() => {
        navigate("/profile");
      }}
    >
      <FontAwesomeIcon icon={faUser} />
    </button>
  );
};
export default ProfileBtn;

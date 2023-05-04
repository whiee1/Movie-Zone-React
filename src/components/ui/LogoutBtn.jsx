import { useContext } from "react";
import UserAuthContext from "../store/user_auth_context";
import { useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const LogoutBtn = () => {
  const context = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    confirmAlert({
      title: "Log Out",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            return;
          },
        },
        {
          label: "Confirm",
          onClick: () => handleLogout(),
        },
      ],

      closeOnClickOutside: true,
      overlayClassName: "overlay",
    });
  };

  const handleLogout = async () => {
    await context.logOut();
    navigate("/login");
    console.log("Signed Out");
  };

  return (
    <>
      <button className="logOutbtn navBtn" onClick={handleClick}>
        Log Out
      </button>
    </>
  );
};
export default LogoutBtn;

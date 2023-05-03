import { useState, useContext } from "react";
import UserAuthContext from "../store/user_auth_context";
import { Link, useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  ////LÄGG TILL OM TID FINNS

  // const confirmLogOut = () => {
  //   return (
  //     <div className="logOutMessage">
  //       <p>Are you sure you want to log out?</p>
  //       <button className="cancelBtn">Cancel</button>
  //       <button className="confirmBtn">Confirm</button>
  //     </div>
  //   );
  // };
  const context = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await context.logOut();
    navigate("/login");
    console.log("Signed Out");
  };

  return (
    <button className="logOutbtn navBtn" onClick={handleLogout}>
      Log Out
    </button>
  );
};
export default LogoutBtn;

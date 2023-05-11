import SearchField from "./ui/SearchField";
import LogoutBtn from "./ui/LogoutBtn";
import DeleteAccount from "./ui/DeleteAccount";
import { useState } from "react";
import HomeBtn from "./ui/HomeBtn";
import ProfileBtn from "./ui/ProfileBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./ui/Dropdown";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowNavbar = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navBar">
      <div className="smallScreen">
        <div className="wrapper">
          <SearchField />
          <ProfileBtn />
          <button onClick={handleShowNavbar} className="burger">
            <FontAwesomeIcon icon={faBars} className="burgerIcon" />
          </button>
        </div>

        <Dropdown
          handleShowNavbar={handleShowNavbar}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      </div>

      <div className="largeScreenNav">
        <HomeBtn />

        <SearchField />
        <div>
          <ProfileBtn />
          <LogoutBtn />
          <DeleteAccount />
        </div>
      </div>
    </nav>
  );
};
export default Nav;

import SearchField from "./ui/SearchField";
import LogoutBtn from "./ui/LogoutBtn";
import DeleteAccount from "./ui/DeleteAccount";
import { useState } from "react";
import HomeBtn from "./ui/HomeBtn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./ui/Dropdown";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowNavbar = (e) => {
    e.preventDefault();

    setShowMenu(!showMenu);
  };

  return (
    <nav className="navBar">
      <div className="smallScreen">
        <div className="wrapper">
          <SearchField />

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
          <LogoutBtn />
          <DeleteAccount />
        </div>
      </div>
    </nav>
  );
};
export default Nav;

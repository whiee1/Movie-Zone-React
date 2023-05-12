import LogoutBtn from "./LogoutBtn";
import DeleteAccount from "./DeleteAccount";

import HomeBtn from "./HomeBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Dropdown som visas vid klick på hamburgermenyn på liten skärm
const Dropdown = ({ showMenu, setShowMenu, handleShowNavbar }) => {
  return (
    <>
      {showMenu && (
        <div className="menuItems">
          <button onClick={handleShowNavbar} className="close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <HomeBtn handleShowNavbar={handleShowNavbar} />

          <LogoutBtn />

          <DeleteAccount />
        </div>
      )}
    </>
  );
};
export default Dropdown;

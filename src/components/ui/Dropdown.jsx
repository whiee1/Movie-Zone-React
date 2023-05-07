import LogoutBtn from "./LogoutBtn";
import DeleteAccount from "./DeleteAccount";

import HomeBtn from "./HomeBtn";

const Dropdown = ({ showMenu, setShowMenu, handleShowNavbar }) => {
  return (
    <>
      {showMenu && (
        <div className="menuItems">
          <button onClick={handleShowNavbar} className="close">
            {" "}
            x{" "}
          </button>
          <HomeBtn />

          <LogoutBtn />

          <DeleteAccount />
        </div>
      )}
    </>
  );
};
export default Dropdown;

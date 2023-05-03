import SearchField from "./ui/SearchField";
import LogoutBtn from "./ui/LogoutBtn";
import DeleteAccount from "./ui/DeleteAccount";
import HomeBtn from "./ui/HomeBtn";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navBar">
      <div>
        <button className="homeBtn navBtn">
          <Link to={"/"}> Home</Link>
        </button>
      </div>

      <SearchField />
      <div>
        <LogoutBtn />
        <DeleteAccount />
      </div>
    </nav>
  );
};
export default Nav;

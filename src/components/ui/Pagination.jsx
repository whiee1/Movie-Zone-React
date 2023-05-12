import { useContext } from "react";
import AuthContext from "../store/auth_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Ändrar sidnr onClick.
const Pagination = ({ page, setPage }) => {
  const context = useContext(AuthContext);

  return (
    <div className="pagination">
      {
        // Är page 1 så renderas inte bakåt knappen
        page > 1 && (
          <button onClick={() => setPage(page - 1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )
      }

      <p>Page {page}</p>
      {
        //finns inte fler filmer att hämta så renderas inte framåt knappen knappen
        context.movies?.length >= 20 && page < context.totalPages && (
          <button onClick={() => setPage(page + 1)}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )
      }
    </div>
  );
};
export default Pagination;

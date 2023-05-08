import { useContext } from "react";
import AuthContext from "../store/auth_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ page, setPage }) => {
  const context = useContext(AuthContext);

  return (
    <div className="pagination">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <p>Page {page}</p>
      {context.movies?.length >= 20 && page < context.totalPages && (
        <button onClick={() => setPage(page + 1)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};
export default Pagination;

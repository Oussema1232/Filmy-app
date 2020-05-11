import React from "react";
import _ from "lodash";
import propTypes from "prop-types";

const Pagination = ({
  maxPage,
  movieNumber,
  handlepageChange,
  currentPage,
}) => {
  const pages = _.ceil(movieNumber / maxPage) + 1;
  if (pages <= 2) return null;
  const pagesArray = _.range(1, pages);
  return (
    <nav>
      <ul className="pagination">
        {pagesArray.map((page) => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
            key={page}
            onClick={() => handlepageChange(page)}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  maxPage: propTypes.number.isRequired,
  movieNumber: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  handlepageChange: propTypes.func.isRequired,
};

export default Pagination;

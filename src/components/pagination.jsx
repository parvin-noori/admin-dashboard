import React from "react";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ totalRecords, pageSize = import.meta.env.VITE_PAGEE_SIZE }) {
  const pages = Math.ceil(totalRecords / pageSize);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;

  const prevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };
  const nextPage = () => {
    if (currentPage < pages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };
  return (
    <nav>
      <ul className="pagination pagination-lg">
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled opacity-50" : ""
          }`}
          onClick={prevPage}
        >
          <a className="page-link">قبلی</a>
        </li>
        {_.times(pages, (index) => (
          <li
            className={`page-item ${
              index + 1 === currentPage ? "active" : " "
            }`}
            key={`page${index + 1}`}
            onClick={() => setSearchParams({ page: index + 1 })}
          >
            <a className="page-link"> {index + 1}</a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pages ? "disabled opacity-50" : ""
          }`}
          onClick={nextPage}
        >
          <a className="page-link">بعدی</a>
        </li>
      </ul>
    </nav>
  );
}

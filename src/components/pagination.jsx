import React from "react";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ totalRecords, pageSize = 1 }) {
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
        <li className="page-item" onClick={prevPage}>
          <a className="page-link">قبلی</a>
        </li>
        {_.times(pages, (index) => (
          <li
            className="page-link"
            key={`page${index + 1}`}
            onClick={() => setSearchParams({ page: index + 1 })}
          >
            {index + 1}
          </li>
        ))}
        <li className="page-item" onClick={nextPage}>
          <a className="page-link">بعدی</a>
        </li>
      </ul>
    </nav>
  );
}

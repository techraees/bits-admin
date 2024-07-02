import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./css/index.css";
import { chevronlefticon, chevronrighticon } from "../../assets";

const Pagination = ({ items, setCurrentItems, currentItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length]
  );

  const handleClick = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const newCurrentItems = items.slice(startIndex, startIndex + itemsPerPage);
    setCurrentItems(newCurrentItems);
  }, [currentPage, items, setCurrentItems]); // Add `setCurrentItems` as a dependency

  return (
    <>
      {currentItems && currentItems.length > 0 && (
        <div>
          <div className="pagination">
            <div
              className={`left_chevron ${
                currentPage !== 1 ? "blue_bg" : "grey_bg"
              }`}
              onClick={handlePrevious}
            >
              <img src={chevronlefticon} />
            </div>

            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                className={`paginated_item ${
                  currentPage === index + 1 ? "active" : "inactive"
                }`}
              >
                {index + 1}
              </div>
            ))}

            <div
              className={`right_chevron ${
                currentPage !== totalPages ? "blue_bg" : "grey_bg"
              }`}
              onClick={handleNext}
            >
              <img src={chevronrighticon} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;

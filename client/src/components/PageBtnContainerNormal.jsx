import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainerNormal = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    const numPage = index + 1;
    return numPage;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;

          if (prevPage < 1) prevPage = numOfPages;

          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {renderPageButtons({ currentPage, numOfPages, handlePageChange })}
      </div>
      <button
        type="button"
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;

          if (nextPage > numOfPages) nextPage = 1;

          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

const addPageButton = ({ pageNumber, activeClass, key, handlePageChange }) => {
  return (
    <button
      key={key || pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={`btn page-btn ${activeClass && "active"}`}
    >
      {pageNumber}
    </button>
  );
};

const renderPageButtons = ({ currentPage, numOfPages, handlePageChange }) => {
  const pageButtons = [];

  pageButtons.push(
    addPageButton({
      pageNumber: 1,
      activeClass: currentPage === 1,
      handlePageChange,
    })
  );

  if (currentPage > 3) {
    pageButtons.push(
      <span className="page-btn dots" key="dots-1">
        ...
      </span>
    );
  }

  if (currentPage !== 2 && currentPage !== 1) {
    pageButtons.push(
      addPageButton({ pageNumber: currentPage - 1, handlePageChange })
    );
  }

  if (currentPage !== 1 && currentPage !== numOfPages) {
    pageButtons.push(
      addPageButton({
        pageNumber: currentPage,
        activeClass: true,
        handlePageChange,
      })
    );
  }

  if (currentPage !== numOfPages - 1 && currentPage !== numOfPages) {
    pageButtons.push(
      addPageButton({ pageNumber: currentPage + 1, handlePageChange })
    );
  }

  if (currentPage < numOfPages - 2) {
    pageButtons.push(
      <span className="page-btn dots" key="dots-2">
        ...
      </span>
    );
  }

  if (numOfPages !== 1) {
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
        handlePageChange,
      })
    );
  }

  return pageButtons;
};
export default PageBtnContainerNormal;

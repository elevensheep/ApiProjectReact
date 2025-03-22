import React from "react";
import { useLocation } from "react-router-dom";
import Book from "./Book";
import ReactPaginate from "react-paginate";
import usePaginatedBooks from "../hooks/usePaginatedBooks";

function BookSearch() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  const {
    books,
    loading,
    errorMessage,
    currentPage,
    totalPages,
    fetchBooks,
    setCurrentPage,
  } = usePaginatedBooks({
    endpoint: "http://localhost:8080/api/books/search",
    params: { search: query },
    enabled: !!query,
  });

  const handlePageClick = (data) => {
    console.log("페이지 변경:", data.selected); // 디버깅용 로그
    setCurrentPage(data.selected);
  };
  
  
  return (
    <div>
      <h2>검색 결과</h2>
      {loading ? <p>불러오는 중...</p> :
       errorMessage ? <p>{errorMessage}</p> :
        <>
          <div className="book-grid">
            {books.map((book) => (
              <Book key={book.bookIsbn} {...book} />
            ))}
          </div>
          <ReactPaginate
            pageCount={totalPages}
            forcePage={currentPage}
            onPageChange={handlePageClick}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      }
    </div>
  );
}

export default BookSearch;


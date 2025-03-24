import React from "react";
import { useLocation } from "react-router-dom";
import Book from "./Book";
import ReactPaginate from "react-paginate";
import usePaginatedBooks from "../hooks/usePaginatedBooks";
import { useState } from "react";

function BookSearch() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");
  const [selectedBook, setSelectedBook] = useState(null);
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

  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };
  
  return (
    <div>
      <h2>검색 결과</h2>
      {loading ? <p>불러오는 중...</p> :
       errorMessage ? <p>{errorMessage}</p> :
        <>
          <div className="book-grid">
            {books.map((book) => (
              <Book 
                key={book.bookIsbn}
                title = {book.bookTitle}
                author = {book.bookAuthor}
                publisher={book.bookPublisher}
                image = {book.bookImg}
                description={book.bookDescription}
                expanded={selectedBook === book.bookIsbn}
                onClick={() => handleBookClick(book.bookIsbn)}
              />
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


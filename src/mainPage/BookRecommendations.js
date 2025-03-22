import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Book from "../components/Book";
import usePaginatedBooks from "../hooks/usePaginatedBooks";
import "../components/BookList.css";

function BookList() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  // usePaginatedBooks 훅을 사용하여 API 호출 및 페이징 처리
  const { books, loading, errorMessage, currentPage, totalPages, setCurrentPage } =
    usePaginatedBooks({
      endpoint: "http://localhost:8080/api/books",
      params: {}, // 추가 파라미터가 필요하면 여기에 작성
      enabled: true,
    });

  // 도서 클릭 시 선택 상태 토글
  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  // 페이지 클릭 시 현재 페이지 상태 업데이트 (훅 내부 useEffect에서 API 호출됨)
  const handlePageClick = (data) => {
    console.log("페이지 선택:", data.selected);
    setCurrentPage(data.selected);
  };

  if (loading) return <p>⏳ 불러오는 중...</p>;

  return (
    <div>
      <h2>📚 도서 목록</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <>
          <ul>
            {books.map((book) => (
              <Book
                key={book.bookIsbn}
                {...book}
                expanded={selectedBook === book.bookIsbn}
                onClick={() => handleBookClick(book.bookIsbn)}
              />
            ))}
          </ul>

          <ReactPaginate
            previousLabel={"< 이전"}
            nextLabel={"다음 >"}
            breakLabel={"..."}
            pageCount={totalPages}
            forcePage={currentPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
}

export default BookList;


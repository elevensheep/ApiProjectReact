import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "./Book";
import ReactPaginate from "react-paginate";
import usePaginatedBooks from "../hooks/usePaginatedBooks";
import "./BookList.css";

const BookList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  // 카테고리에 따라 API 엔드포인트를 동적으로 구성합니다.
  const endpoint = `http://localhost:8080/api/recommend/category/${category}`;
  
  // usePaginatedBooks 훅을 통해 책 데이터와 페이지 정보 로딩
  const { books, loading, errorMessage, currentPage, totalPages, setCurrentPage } = usePaginatedBooks({
    endpoint,
    params: {}, // 추가 파라미터가 필요하다면 이곳에 작성합니다.
    enabled: true,
  });

  // 카테고리가 변경되면 페이지를 0으로 초기화하여 항상 첫 페이지부터 로딩하도록 합니다.
  useEffect(() => {
    setCurrentPage(0);
  }, [category, setCurrentPage]);

  // 선택된 도서의 확장/축소를 토글합니다.
  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  // 페이지 클릭 시, 현재 페이지 상태를 업데이트합니다.
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="book-list">
      <h2>{category ? `${category} 관련 도서` : "📚 전체 추천 도서"}</h2>
      
      {loading ? (
        <p>불러오는 중...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : books.length === 0 ? (
        <p>해당 카테고리에 대한 추천 도서가 없습니다.</p>
      ) : (
        <>
          <div className="book-grid">
            {books.map((book) => (
              <Book
                key={book.bookIsbn}
                {...book}
                expanded={selectedBook === book.bookIsbn}
                onClick={() => handleBookClick(book.bookIsbn)}
              />
            ))}
          </div>
          
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
};

export default BookList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Book from "../components/Book";
import ReactPaginate from "react-paginate";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const params = {}; // 필요 시 검색 필터 파라미터 추가

  const fetchBooks = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/books", {
        params: { ...params, page, size: 20 },
        withCredentials: true,
      });
      const data = response.data;
      setBooks(data.content);
      setTotalPages(data.totalPages || 1);
      setErrorMessage("");
    } catch (error) {
      if (error.response?.status === 404) {
        setBooks([]);
        setErrorMessage("📭 도서 정보를 찾을 수 없습니다.");
      } else {
        console.error("❌ 도서 데이터 불러오기 실패:", error);
        setErrorMessage("🚨 서버 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="book-list">
      {loading ? (
        <p>불러오는 중...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : books.length === 0 ? (
        <p>도서가 없습니다.</p>
      ) : (
        <>
          <div className="book-grid">
            {books.map((book) => (
              <Book
                key={book.bookIsbn}
                title={book.bookTitle}
                author={book.bookAuthor}
                publisher={book.bookPublisher}
                image={book.bookImg}
                description={book.bookDescription}
                expanded={selectedBook === book.bookIsbn}
                onClick={() => handleBookClick(book.bookIsbn)}
              />
            ))}
          </div>

          <ReactPaginate
            previousLabel={"< 이전"}
            nextLabel={"다음 >"}
            breakLabel={"..."}
            pageCount={Math.max(totalPages, 1)}
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

export default BookListPage;

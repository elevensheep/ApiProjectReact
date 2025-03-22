import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate"; // ✅ 페이지네이션 컴포넌트
import "../components/BookList.css"; // 부모 디렉터리에서 불러올 경우
import Book from "../components/Book";

function BookList() {
  const [books, setBooks] = useState([]);
  const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPages: 1 }); // ✅
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async (page = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books?page=${page}`, // ✅ 페이지 쿼리 포함
        { withCredentials: true }
      );
      setBooks(response.data.content);
      setPageInfo({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
      console.log("BookList: ", response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMessage("📭 오늘의 추천 도서가 없습니다.");
      } else {
        console.error("❌ 도서 데이터 불러오기 실패:", error);
        setErrorMessage(
          "🚨 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(0); // 초기 로딩 시 0페이지
  }, [navigate]);
  
  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };
  
  const handlePageClick = (data) => {
    fetchBooks(data.selected); // 선택한 페이지로 이동
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
            {/* {books.map((book) => (
              <li key={book.bookIsbn}>
                {book.bookTitle} - {book.bookAuthor}
              </li>
            ))} */}
          </ul>

          <ReactPaginate
            previousLabel={"< 이전"}
            nextLabel={"다음 >"}
            breakLabel={"..."}
            pageCount={pageInfo.totalPages}
            forcePage={pageInfo.currentPage}
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

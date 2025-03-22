import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "./Book";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./BookList.css";

const BookList = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPages: 1 });
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async (page = 0) => {
    try {
      const response = await axios.get(`http://localhost:8080/books/recommend/category/${category}?page=${page}`, {
        withCredentials: true
      });

      const data = response.data;
      setBooks(data.content);
      setPageInfo({
        currentPage: data.currentPage,
        totalPages: data.totalPages
      });
    } catch (error) {
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      } else if (error.response?.status === 404) {
        setBooks([]);
        setPageInfo({ currentPage: 0, totalPages: 0 });
      } else {
        alert("서버 오류가 발생했습니다.");
        console.error("도서 불러오기 실패:", error);
      }
    }
  };

  useEffect(() => {
    fetchBooks(0); // category 변경 시 0페이지부터 시작
  }, [category]);

  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  const handlePageClick = (data) => {
    fetchBooks(data.selected);
  };

  return (
    <div className="book-list">
      <h2>{category ? `${category} 관련 도서` : "📚 전체 추천 도서"}</h2>

      {books.length === 0 ? (
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
};

export default BookList;

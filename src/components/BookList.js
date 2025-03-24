import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Book from "./Book";
import ReactPaginate from "react-paginate";
import usePaginatedBooks from "../hooks/usePaginatedBooks";
import images from "./123.jpg";
import "./BookList.css";

const BookList = () => {
  const { category } = useParams();
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookmarkedIsbns, setBookmarkedIsbns] = useState([]); // ✅ 북마크 상태

  const endpoint = `http://localhost:8080/api/recommend/category/${category}`;

  const {
    books,
    loading,
    errorMessage,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePaginatedBooks({
    endpoint,
    params: {},
    enabled: true,
  });

  // ✅ 북마크 토글 핸들러
  const handleBookmarkToggle = (isbn) => {
    setBookmarkedIsbns((prev) =>
      prev.includes(isbn)
        ? prev.filter((id) => id !== isbn)
        : [...prev, isbn]
    );
  };

  // ✅ 더미 데이터 (에러 fallback용)
  const dummyBooks = [
    {
      bookIsbn: "1",
      title: "정치란 무엇인가",
      author: "김정치",
      publisher: "사회출판사",
      description: "정치의 기본 개념을 설명한 책임...",
      image: images,
      bookCategory: "economic",
      locations: [
        { name: "강남 고분문고", url: "https://example.com/gangnam" },
        { name: "광화문 교보문고", url: "https://example.com/gwanghwamun" },
      ],
    },
    {
      bookIsbn: "2",
      title: "경제의 이해",
      author: "박경제",
      publisher: "경제출판사",
      description: "경제 원리를 쉽게 풀어쓴 입문서",
      image: images,
      bookCategory: "economic",
    },
    {
      bookIsbn: "3",
      title: "정치란 무엇인가",
      author: "김정치",
      publisher: "사회출판사",
      description: "정치의 기본 개념을 설명한 책임...",
      image: images,
      bookCategory: "economic",
      locations: [
        { name: "강남 고분문고", url: "https://example.com/gangnam" },
        { name: "광화문 교보문고", url: "https://example.com/gwanghwamun" },
      ],
    },
    {
      bookIsbn: "4",
      title: "정치란 무엇인가",
      author: "김정치",
      publisher: "사회출판사",
      description: "정치의 기본 개념을 설명한 책임...",
      image: images,
      bookCategory: "economic",
      locations: [
        { name: "강남 고분문고", url: "https://example.com/gangnam" },
        { name: "광화문 교보문고", url: "https://example.com/gwanghwamun" },
      ],
    },
  ];

  // ✅ 카테고리 바뀔 때 페이지 초기화
  useEffect(() => {
    setCurrentPage(0);
  }, [category, setCurrentPage]);

  // ✅ 책 클릭 핸들러 (확장 토글)
  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // ✅ 에러 시 더미 데이터 사용
  const filteredBooks = errorMessage ? dummyBooks : books;

  return (
    <div className="book-list">
      <h2>{category ? `${category} 관련 도서` : "📚 전체 추천 도서"}</h2>

      {loading ? (
        <p>⏳ 불러오는 중...</p>
      ) : (
        <>
          {errorMessage && (
            <>
              <p>⚠️ 서버 오류가 발생했습니다.</p>
              <p>💡 더미 데이터를 대신 표시합니다.</p>
            </>
          )}

          {filteredBooks.length === 0 ? (
            <p>❗ 해당 카테고리에 대한 추천 도서가 없습니다.</p>
          ) : (
            <>
              <div className="book-grid">
                {filteredBooks.map((book) => (
                  <Book
                    key={book.bookIsbn}
                    {...book}
                    expanded={selectedBook === book.bookIsbn}
                    onClick={() => handleBookClick(book.bookIsbn)}
                    isBookmarked={bookmarkedIsbns.includes(book.bookIsbn)}
                    onBookmarkToggle={() => handleBookmarkToggle(book.bookIsbn)}
                  />
                ))}
              </div>

              {!errorMessage && (
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;

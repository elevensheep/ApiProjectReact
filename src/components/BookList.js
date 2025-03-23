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


// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Book from "./Book";
// import images from "./123.jpg";
// import "./BookList.css";
// import images1 from "./1234.jpeg";

// const initialBooks = [
//     { title: "정치11111111111111111란 무엇인가", author: "김정치", publisher: "사회출판사", image: images1, description: "정치의 기본 개념", isbn: "978-89-1234-222-1", category: "정치" },
//     { title: "현대 정치 분석", author: "박현대", publisher: "정치학 출판사", image: images, description: "현대 정치 구조", isbn: "978-89-1234-222-2", category: "정치" },
//     { title: "국제 정치 개론", author: "이국제", publisher: "국제관계 출판사", image: images, description: "국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념국제 정치 개념", isbn: "978-89-1234-222-3", category: "정치" },
//     { title: "한국 정치의 역사", author: "정한국", publisher: "사회출판사", image: images, description: "한국 정치 변천사", isbn: "978-89-1234-222-4", category: "정치" },
//     { title: "대통령과 권력", author: "권력자", publisher: "정치학 출판사", image: images, description: "대통령제의 구조", isbn: "978-89-1234-222-5", category: "정치" },
//     { title: "정치의 기111111111111111111111111술", author: "박기술", publisher: "국제관계 출판사", image: images, description: "정치 협상과 전략", isbn: "978-89-1234-222-6", category: "정치" },
// ];


// const BookList = () => {
//     const { category } = useParams();
//     const [selectedBook, setSelectedBook] = useState(null);

//     const filteredBooks = category
//         ? initialBooks.filter((book) => book.category === category)
//         : initialBooks;

//     const handleBookClick = (isbn) => {
//         setSelectedBook(selectedBook === isbn ? null : isbn);
//     };

//     // 📌 최소 2줄(=8칸) 보장용 더미 아이템 추가
//     const ensureTwoRows = (books) => {
//         const result = [...books];
//         const needed = Math.max(0, 8 - books.length); // 4개 * 2줄
//         for (let i = 0; i < needed; i++) {
//             result.push({ isbn: `dummy-${i}`, isDummy: true });
//         }
//         return result;
//     };

//     const visibleBooks = ensureTwoRows(filteredBooks);

//     const [bookmarks, setBookmarks] = useState([]); // isbn 목록

//     const handleBookmarkToggle = (book) => {
//         if (bookmarks.includes(book.isbn)) {
//             // 북마크 제거
//             setBookmarks(bookmarks.filter((id) => id !== book.isbn));
//             // 🔥 DB 삭제 요청
//         } else {
//             // 북마크 추가
//             setBookmarks([...bookmarks, book.isbn]);
//             // 🔥 DB 저장 요청
//         }
//     };

//     return (
//         <div className="book-list">
//             <h2>{category ? `${category} 관련 도서` : "📚 전체 추천 도서"}</h2>
//             <div className="book-grid">
//                 {visibleBooks.map((book, index) =>
//                     book.isDummy ? (
//                         <div key={book.isbn} className="book dummy" />
//                     ) : (
//                         <Book
//                             key={book.isbn}
//                             {...book}
//                             expanded={selectedBook === book.isbn}
//                             onClick={() => handleBookClick(book.isbn)}
//                             isBookmarked={bookmarks.includes(book.isbn)}         // ✅ 상태 전달
//                             onBookmarkToggle={() => handleBookmarkToggle(book)}  // ✅ 클릭 시 동작
//                         />
//                     )
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookList;

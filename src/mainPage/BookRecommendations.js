import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Book from "../components/Book";
import usePaginatedBooks from "../hooks/usePaginatedBooks";

function BookList() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  const styles = {
    wrapper: {
      overflowY: "hidden",
      padding: "20px",
      width: "100%",
      padding : 0
    },
    categorySection: {
      marginBottom: "32px",
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    categoryTitle: {
      marginBottom: "12px",
      fontSize: "1.25rem",
      fontWeight: "bold",
      borderBottom: "1px solid #ccc",
      paddingBottom: "4px",
    },
    horizontalScroll: {
      display: "flex",
      overflowX: "auto",
      gap: "16px",
      padding: "0px",
      margin: "0px",
      listStyle: "none",
      scrollBehavior: "smooth",
    },
    bookItem: {
      flex: "0 0 auto",
    },
  };

  const {
    books,
    loading,
    errorMessage,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePaginatedBooks({
    endpoint: "http://localhost:8080/api/books",
    params: {},
    enabled: true,
  });

  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  const handlePageClick = (data) => {
    console.log("페이지 선택:", data.selected);
    setCurrentPage(data.selected);
  };

  if (loading) return <p>⏳ 불러오는 중...</p>;

  const categories = ["인문과학", "사회과학", "자연과학", "어문학", "미분류"];

  return (
    <div style={styles.wrapper}>
      <h2>📚 도서 목록</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <>
          {categories.map((category) => {
            const filteredBooks = books.filter(
              (book) => book.bookCategory === category
            );
            if (filteredBooks.length === 0) return null;

            return (
              <div key={category} style={styles.categorySection}>
                <h3 style={styles.categoryTitle}>📖 {category}</h3>
                <ul style={styles.horizontalScroll}>
                  {filteredBooks.map((book) => (
                    <li key={book.bookIsbn} style={styles.bookItem}>
                      <Book
                        {...book}
                        expanded={selectedBook === book.bookIsbn}
                        onClick={() => handleBookClick(book.bookIsbn)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )}

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
    </div>
  );
}

export default BookList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Book from "../components/Book";

function BookList() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    wrapper: {
      overflowY: "hidden",
      padding: 0,
      width: "100%",
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
      padding: 0,
      margin: 0,
      listStyle: "none",
      scrollBehavior: "smooth",
    },
    bookItem: {
      flex: "0 0 auto",
    },
  };

  // ✅ 데이터 불러오기 (axios 직접 사용)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((res) => {
        console.log("📦 API 응답:", res.data);
        setBooks(res.data); // 응답이 배열이라면 그대로
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API 오류:", err);
        setErrorMessage("도서를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
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
    </div>
  );
}

export default BookList;

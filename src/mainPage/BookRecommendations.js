import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // ❗ 에러 메시지 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else if (error.response?.status === 404) {
          setErrorMessage("📭 오늘의 추천 도서가 없습니다.");
        } else {
          console.error("❌ 도서 데이터 불러오기 실패:", error);
          setErrorMessage("🚨 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  if (loading) return <p>⏳ 불러오는 중...</p>;

  return (
    <div>
      <h2>📚 도서 목록</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p> // 안내 메시지 표시
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.isbn}>
              {book.title} - {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;

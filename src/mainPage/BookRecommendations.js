import React, { useEffect, useState } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 비동기 함수 정의
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/"); // API 주소
        setBooks(response.data); // 데이터 저장
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchBooks(); // 함수 호출
  }, []);

  if (loading) return <p>⏳ 불러오는 중...</p>;

  return (
    <div>
      <h2>📚 도서 목록</h2>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;

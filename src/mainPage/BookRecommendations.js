import React, { useState } from "react";
import Book from "../components/Book";
import image from "../components/123.jpg"; // 이미지 경로 맞게 수정
import "../components/Book.css";

const dummyBooks = [
  {
    bookIsbn: "978-89-1234-0001",
    title: "정치란 무엇인가",
    author: "김정치",
    publisher: "사회출판사",
    description: "정치의 기본 개념을 설명한 책입니다람쥐가 춤을 추는 강우람 천재ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ라면이 먹고 싶은 날이네요 12312312312313123",
    bookCategory: "정치",
    image: image,
    locations: [
      { name: "광화문 교보문고", url: "https://example.com/kyobo1" },
      { name: "강남 교보문고", url: "https://example.com/kyobo2" },
    ],
  },
  {
    bookIsbn: "978-89-1234-0002",
    title: "현대 정치 분석",
    author: "박정현",
    publisher: "정치학사",
    description: "현대 정치를 분석하는 책입니다.",
    bookCategory: "정치",
    image: image,
    locations: [],
  },
];

function BookList() {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (isbn) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 도서 목록 (더미 데이터)</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {dummyBooks.map((book) => (
          <Book
            key={book.bookIsbn}
            {...book}
            expanded={selectedBook === book.bookIsbn}
            onClick={() => handleBookClick(book.bookIsbn)}
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Book from "./Book";
import images from "./123.jpg";
import "./BookList.css";

const initialBooks = [
    { title: "정치란 무엇인가", author: "김정치", publisher: "사회출판사", image: images, description: "정치의 기본 개념", isbn: "978-89-1234-222-1", category: "정치" },
    { title: "현대 정치 분석", author: "박현대", publisher: "정치학 출판사", image: images, description: "현대 정치 구조", isbn: "978-89-1234-222-2", category: "정치" },
    { title: "국제 정치 개론", author: "이국제", publisher: "국제관계 출판사", image: images, description: "국제 정치 개념", isbn: "978-89-1234-222-3", category: "정치" },
    { title: "한국 정치의 역사", author: "정한국", publisher: "사회출판사", image: images, description: "한국 정치 변천사", isbn: "978-89-1234-222-4", category: "정치" },
    { title: "대통령과 권력", author: "권력자", publisher: "정치학 출판사", image: images, description: "대통령제의 구조", isbn: "978-89-1234-222-5", category: "정치" },
    { title: "정치의 기술", author: "박기술", publisher: "국제관계 출판사", image: images, description: "정치 협상과 전략", isbn: "978-89-1234-222-6", category: "정치" },
];

const BookList = () => {
    const { category } = useParams();
    const [selectedBook, setSelectedBook] = useState(null);

    const filteredBooks = category ? initialBooks.filter(book => book.category === category) : initialBooks;

    // 📌 책 클릭 시 자리 차지하도록 설정
    const handleBookClick = (isbn) => {
        setSelectedBook(selectedBook === isbn ? null : isbn);
    };

    return (
        <div className="book-list">
            <h2>{category ? `${category} 관련 도서` : "📚 전체 추천 도서"}</h2>
            <div className="book-grid">
                {filteredBooks.map((book, index) => (
                    <Book
                        key={book.isbn}
                        {...book}
                        expanded={selectedBook === book.isbn} // 클릭 시 확장
                        onClick={() => handleBookClick(book.isbn)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookList;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Book from "./Book";
import images from "./123.jpg";
import "./BookList.css";
import Banner from "./Banner";

// 📌 책 데이터 생성
const initialBooks = Array.from({ length: 20 }, (_, i) => ({
    title: `정치의 기술 ${i + 1}`,
    author: `저자 ${i + 1}`,
    publisher: `출판사 ${i + 1}`,
    image: images,
    description: `정치 협상과 전략 ${i + 1}`,
    category: "정치"
}));

// 📌 확장된 책의 위치 설정 함수
const getGridPosition = (index, expanded) => {
    if (!expanded) return {};

    const gridRow = "span 2"; // ✅ 세로 2칸 차지

    if ((index - 1) % 4 === 0) {
        return { gridColumn: "1 / span 2", gridRow };
    }

    if ((index - 2) % 4 === 0) {
        return { gridColumn: "2 / span 2", gridRow };
    }

    if ((index - 3) % 4 === 0) {
        return { gridColumn: "2 / span 2", gridRow };
    }

    if (index % 4 === 0) {
        return { gridColumn: "3 / span 2", gridRow };
    }

    return {};
};


// 📌 BookList 컴포넌트
const BookList = () => {
    const { category } = useParams();
    const [selectedBook, setSelectedBook] = useState(null);

    const filteredBooks = category ? initialBooks.filter(book => book.category === category) : initialBooks;

    const handleBookClick = (index) => {
        setSelectedBook(selectedBook === index ? null : index);
    };

    return (
        <div className="book-list">
            <Banner />
            <h2>{category ? `${category} 관련 도서` : "📚 전체 추천 도서"}</h2>
            <div className="book-grid">
                {filteredBooks.map((book, index) => (
                    <Book
                        key={index}
                        {...book}
                        expanded={selectedBook === index}
                        onClick={() => handleBookClick(index)}
                        style={getGridPosition(index + 1, selectedBook === index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookList;

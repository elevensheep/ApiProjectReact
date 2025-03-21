import React from "react";
import "./components.css";

const books = [
    { id: 1, title: "책 제목 1", img: "book1.jpg" },
    { id: 2, title: "책 제목 2", img: "book2.jpg" },
    { id: 3, title: "책 제목 3", img: "book3.jpg" }
];

function BookRecommendations() {
    return (
        <div className="book-list">
            {books.map((book) => (
                <div key={book.id} className="book-item">
                    <img src={book.img} alt={book.title} />
                    <p>{book.title}</p>
                </div>
            ))}
        </div>
    );
}

export default BookRecommendations;

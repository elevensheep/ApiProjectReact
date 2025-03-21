import React from "react";
import "./BookDetail.css";

const BookDetail = ({ book, onClose }) => {
    if (!book) return null;

    return (
        <div className="book-detail-overlay" onClick={onClose}>
            <div className="book-detail" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>
                <img src={book.image} alt={book.title} className="book-detail-img" />
                <h2>{book.title}</h2>
                <p><strong>저자:</strong> {book.author}</p>
                <p><strong>출판사:</strong> {book.publisher}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p className="description">{book.description}</p>
            </div>
        </div>
    );
};

export default BookDetail;

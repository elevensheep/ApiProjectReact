import React from "react";
import "./Book.css";

const Book = ({ title, author, publisher, image, description, expanded, onClick }) => {
    return (
        <div className={`book ${expanded ? "expanded" : ""}`} onClick={onClick}>
            {/* 🔥 기본 상태에서는 기존처럼 표시 */}
            {!expanded && (
                <>
                    <div className="book-content">
                        <img src={image} alt={title} />
                        <h3 className="book-title">{title}</h3>
                    </div>
                </>
            )}

            {/* 🔥 확대되었을 때만 `book-details`로 묶기 */}
            {expanded && (
                <div className="book-details">
                    <div className="book-content">
                        <img src={image} alt={title} />
                    </div>
                    <div className="book-info">
                        <h3 className="book-title">{title}</h3>
                        <p><strong>저자:</strong> {author}</p>
                        <p><strong>출판사:</strong> {publisher}</p>
                    </div>
                </div>
            )}

            {/* 🔥 설명은 항상 아래에 표시 */}
            {expanded && (
                <div className="book-description">
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
};

export default Book;

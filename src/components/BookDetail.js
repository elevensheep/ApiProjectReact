// components/BookDetail.jsx
import React from "react";
import "./Book.css";

const BookDetail = ({ book, onClose }) => {
    if (!book) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h3>{book.title}</h3>

                {book.locations?.length > 0 ? (
                    <div className="location-list">
                        <strong>위치 및 링크:</strong>
                        <div className="location-grid">
                            {book.locations.map((loc, i) => (
                                <div className="location-card" key={i}>
                                    <p className="location-name">{loc.name}</p>
                                    {loc.url && (
                                        <a href={loc.url} target="_blank" rel="noopener noreferrer" className="location-link">
                                            바로가기 🔗
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p><strong>위치:</strong> 정보 없음</p>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
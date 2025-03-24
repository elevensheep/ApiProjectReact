import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Book.css";

const Book = ({
    title,
    author,
    publisher,
    image,
    description,
    onClick,
    locations = [],
    isbn,
    expanded,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const location = useLocation();
    const isPopupMode = location.pathname === "/"; // 메인 페이지만 팝업

    const handleMoreClick = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleOpenLocationModal = () => setShowLocationModal(true);
    const handleCloseLocationModal = () => setShowLocationModal(false);

    useEffect(() => {
        if (!isPopupMode && showModal) {
            setShowModal(false);
        }
    }, [isPopupMode, showModal]);

    // 팝업 모드 (메인 페이지)
    if (isPopupMode) {
        return (
            <>
                <div className="book" onClick={() => setShowModal(true)}>
                    <img src={image} alt={title} />
                    <h3 className="book-title">{title}</h3>
                </div>

                {showModal && (
                    <div className="modal-overlay fullscreen" onClick={handleCloseModal}>
                        <div className="modal-popup-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-popup-close" onClick={handleCloseModal}>×</button>
                            <div className="popup-book-content">
                                <img src={image} alt={title} className="popup-book-image" />
                                <div className="popup-book-info">
                                    <h3>{title}</h3>
                                    <p><strong>저자:</strong> {author}</p>
                                    <p><strong>출판사:</strong> {publisher}</p>

                                    {locations.length > 0 && (
                                        <button className="more-button" onClick={handleOpenLocationModal}>
                                            위치 정보 더보기 🔍
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="popup-book-description">
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {showLocationModal && (
                    <div className="modal-overlay fullscreen" onClick={handleCloseLocationModal}>
                        <div className="modal-popup-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-popup-close" onClick={handleCloseLocationModal}>×</button>
                            <h3>📍 위치 및 링크 정보</h3>
                            <div className="location-grid">
                                {locations.map((loc, i) => (
                                    <div className="location-card" key={i}>
                                        <p className="location-name">{loc.name}</p>
                                        {loc.url && (
                                            <a
                                                href={loc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="location-link"
                                            >
                                                바로가기 🔗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // 확장형 모드 (BookList / Bookmark 등)
    return (
        <div className={`book ${expanded ? "expanded" : ""}`} onClick={onClick}>
            <div className="book-content">
                <img src={image} alt={title} />
                <h3 className="book-title">{title}</h3>
            </div>
            <div className="book-info">
                <p><strong>저자:</strong> {author}</p>
                <p><strong>출판사:</strong> {publisher}</p>
                <button className="more-button" onClick={handleMoreClick}>더보기 🔍</button>
            </div>
            <div className="book-description">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Book;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react"; // ✅ 루시드 아이콘
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
    isBookmarked,              // ✅ 북마크 여부
    onBookmarkToggle,         // ✅ 북마크 토글 함수
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

    // 공통 북마크 버튼
    const renderBookmarkButton = () => (
        <button
            className="bookmark-icon"
            onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle();
            }}
            aria-label="북마크"
        >
            {isBookmarked ? <BookmarkCheck size={35} /> : <Bookmark size={35} />}
        </button>
    );

    // 팝업 모드 (메인 페이지)
    if (isPopupMode) {
        return (
            <>
                <div className="book" onClick={() => setShowModal(true)}>
                    <img src={image} alt={title} />
                    <h3 className="book-title">{title}</h3>
                    {renderBookmarkButton()}
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
                                    <div className="popup-actions">
                                        {locations.length > 0 && (
                                            <button
                                                className="more-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenLocationModal();
                                                }}
                                            >
                                                위치 정보 더보기 🔍
                                            </button>
                                        )}
                                        {renderBookmarkButton()}
                                    </div>
                                </div>
                            </div>
                            <div className="popup-book-description">
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 공통 위치 모달 */}
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
        <>
            <div className={`book ${expanded ? "expanded" : ""}`} onClick={onClick}>
                {renderBookmarkButton()} {/* 항상 보이는 북마크 아이콘 */}
                {expanded ? (
                    <>
                        <div className="book-expanded-grid">
                            <div className="book-expanded-image">
                                <img src={image} alt={title} />
                            </div>
                            <div className="book-expanded-info">
                                <h3 className="book-title">{title}</h3>
                                <p><strong>저자:</strong> {author}</p>
                                <p><strong>출판사:</strong> {publisher}</p>
                                {locations?.length > 0 && (
                                    <button
                                        className="more-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenLocationModal();
                                        }}
                                    >
                                        위치 정보 더보기 🔍
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="book-description">
                            <p>{description}</p>
                        </div>
                    </>
                ) : (
                    <div className="book-content">
                        <img src={image} alt={title} />
                        <h3 className="book-title">{title}</h3>
                    </div>
                )}
            </div>

            {/* 공통 위치 모달 */}
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
};

export default Book;

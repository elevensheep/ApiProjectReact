import React from "react";
import { Bookmark } from "lucide-react";
import "./Book.css";

const Book = ({
    title,
    author,
    publisher,
    image,
    description,
    expanded,
    onClick,
    isBookmarked,        // ✅ 북마크 상태 (외부에서 props로 전달)
    onBookmarkToggle,    // ✅ 북마크 토글 핸들러 (외부에서 함수 전달)
}) => {
    return (
        <div className={`book ${expanded ? "expanded" : ""}`} onClick={onClick}>
            {/* ✅ 북마크 아이콘 (항상 오른쪽 상단) */}
            <div
                className="bookmark-icon"
                onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 막기
                    onBookmarkToggle();
                }}
            >
                {isBookmarked ? (
                    <Bookmark size={30} color="#f39c12" fill="#f39c12" />
                ) : (
                    <Bookmark size={30} color="#aaa" />
                )}
            </div>

            {!expanded && (
                <div className="book-content">
                    <div className="book-image-wrapper">
                        <img src={image} alt={title} />
                    </div>
                    <h3 className="book-title">{title}</h3>
                </div>
            )}

            {/* 🔥 확장 상태 */}
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

            {/* 설명 */}
            {expanded && (
                <div className="book-description">
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
};


export default Book;

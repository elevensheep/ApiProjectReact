import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./BookList.css";

// 📌 가짜 fetch 함수
const fetchBookmarks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bookmarks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // 예시: 이미지가 URL일 경우 그대로 사용
      return data;
    } catch (error) {
      console.error('북마크 데이터를 불러오는 중 오류 발생:', error);
      return []; // 에러 시 빈 배열 반환
    }
};

// 📌 2줄 보장을 위한 더미 추가
const ensureTwoRows = (books) => {
    const result = [...books];
    const needed = Math.max(0, 8 - result.length); // 4개 * 2줄

    for (let i = 0; i < needed; i++) {
        result.push({ isbn: `dummy-${i}`, isDummy: true });
    }

    return result;
};

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const load = async () => {
            const data = await fetchBookmarks();
            setBookmarks(data);
        };
        load();
    }, []);

    const handleBookClick = (isbn) => {
        setSelectedBook(selectedBook === isbn ? null : isbn);
    };

    // ✅ 북마크 토글 기능 (삭제만)
    const handleBookmarkToggle = (book) => {
        setBookmarks(prev => prev.filter(item => item.isbn !== book.isbn));
        // 🔥 여기에 실제 삭제 API 호출 가능
    };

    const visibleBooks = ensureTwoRows(bookmarks);

    return (
        <div className="book-list">
            <h2>📌 북마크한 도서</h2>
            <div className="book-grid">
                {visibleBooks.map((book) =>
                    book.isDummy ? (
                        <div key={book.isbn} className="book dummy" />
                    ) : (
                        <Book
                            key={book.isbn}
                            {...book}
                            expanded={selectedBook === book.isbn}
                            onClick={() => handleBookClick(book.isbn)}
                            isBookmarked={true} // 북마크된 도서니까 무조건 true
                            onBookmarkToggle={() => handleBookmarkToggle(book)}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Bookmark;

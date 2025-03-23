import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./BookList.css";

// 📌 가짜 fetch 함수
const fetchBookmarks = async () => {
    return [
        {
            title: "북마크 도서 1",
            author: "작가 1",
            publisher: "출판사 1",
            image: require("./123.jpg"),
            description: "이 책은 정치에 대한 기본 개념을 다루고 있으며, 초보자도 쉽게 이해할 수 있도록 구성되어 있습니다.",
            isbn: "111-11-1111-111-1",
        },
        {
            title: "북마크 도서 2",
            author: "작가 2",
            publisher: "출판사 2",
            image: require("./123.jpg"),
            description: "국제 정치의 복잡한 관계와 외교 전략을 심도 있게 탐구한 책입니다.",
            isbn: "222-22-2222-222-2",
        },
        {
            title: "북마크 도서 3",
            author: "작가 3",
            publisher: "출판사 3",
            image: require("./123.jpg"),
            description: "현대 사회에서의 권력 구조와 그 이면을 분석한 정치 철학서입니다.",
            isbn: "333-33-3333-333-3",
        },
        {
            title: "북마크 도서 4",
            author: "작가 4",
            publisher: "출판사 4",
            image: require("./123.jpg"),
            description: "정치 캠페인과 대중 심리에 관한 흥미로운 사례를 다룬 책입니다.",
            isbn: "444-44-4444-444-4",
        },
        {
            title: "북마크 도서 5",
            author: "작가 5",
            publisher: "출판사 5",
            image: require("./123.jpg"),
            description: "사회운동과 정치적 참여의 변화를 설명하며 독자의 행동을 유도합니다.",
            isbn: "555-55-5555-555-5",
        },
        {
            title: "북마크 도서 6",
            author: "작가 6",
            publisher: "출판사 6",
            image: require("./123.jpg"),
            description: "이 책은 민주주의의 역사와 현재를 다루며, 정치의 본질을 탐구합니다.",
            isbn: "666-66-6666-666-6",
        },
    ];
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


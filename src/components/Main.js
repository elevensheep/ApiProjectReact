import React from "react";
import Banner from "./Banner"; // ✅ `components` 폴더 안에 있는지 확인
import BookRecommendation from "./BookRecommendations";
import "./components.css";


function Main() {
    return (
        <div className="main">
            <Banner />
            <BookRecommendation /> {/* 🔥 추천 도서 */}
        </div>
    );
}

export default Main;

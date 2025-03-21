import React from "react";
import "./components.css"; 

function NewsFeed() {
    return (
        <section className="bg-white p-4 rounded shadow my-4">
            <h2 className="text-xl font-semibold mb-2">최신 뉴스</h2>
            <p>뉴스 데이터를 가져와 표시할 공간</p>
        </section>
    );
}

export default NewsFeed;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner"; // ✅ 배너 추가
import BookList from "./components/BookList";
import BookRecommendation from "./components/BookRecommendations";
import Main from "./components/Main";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Banner /> {/* 🔥 배너 추가 (항상 보이도록) */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/category/:category" element={<BookList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

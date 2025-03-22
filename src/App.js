import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner"; // ✅ 배너 추가
import BookList from "./components/BookList";
import BookRecommendation from "./components/BookRecommendations";
import Main from "./components/Main";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Banner /> {/* 🔥 배너 추가 (항상 보이도록) */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/category/:category" element={<BookList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

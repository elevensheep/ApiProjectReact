import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import BookRecommendation from "./components/BookRecommendations";
import Main from "./components/Main";
import "./App.css";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/category/:category" element={<BookList />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

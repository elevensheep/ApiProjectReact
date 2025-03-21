import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Main from "./mainPage/Main";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BookSearch from "./components/BookSearch";

const styles = {
    wrapper : {
        width : "60%",
        margin : "0 auto",
        display : "flex",
        flexDirection : "column"
    },

    app: {
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        caretColor: "transparent"
    }
}
function App() {
    return (
        <Router>
            <div className="app">

                <div style={styles.wrapper} className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/category/:category" element={<BookList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/booksearch" element={<BookSearch />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

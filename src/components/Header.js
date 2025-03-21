import React, { useState } from "react";
import { Search, Bookmark, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";

function Header() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // 검색 실행 함수 (Enter 및 아이콘 클릭 시 실행)
    const executeSearch = () => {
        if (search.trim()) {
            console.log(search);
            navigate(`/booksearch?search=${search}`);
        }
    };

    // Enter 키 입력 시 검색 실행
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            executeSearch();
        }
    };

    // 아이콘 클릭 시 검색 실행
    const handleIconClick = () => {
        executeSearch();
    };

    return (
        <header className="header">
            <h1><Link to="/">책 추천 사이트</Link></h1>
            <ul className="nav-menu">
                <li className="nav-item"><Link to="/category/경제">경제</Link></li>
                <li className="nav-item"><Link to="/category/정치">정치</Link></li>
                <li className="nav-item"><Link to="/category/스포츠">스포츠</Link></li>
                <li className="nav-item"><Link to="/category/사회">사회</Link></li>
                <li className="nav-item"><Link to="/category/국제">국제</Link></li>
            </ul>

            <nav className="nav">
                <div className="nav-links">
                    <Link to="/bookmarks" className="nav-link">
                        <Bookmark size={18} /> 북마크
                    </Link>
                    <Link to="/login" className="nav-link">
                        <LogIn size={18} /> 로그인/회원가입
                    </Link>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="검색..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearch} // Enter 키 입력 시 검색
                        className="search-input"
                    />
                    <Search className="search-icon" size={18} onClick={handleIconClick} /> {/* 🔥 아이콘 클릭 시 검색 실행 */}
                </div>
            </nav>
        </header>
    );
}

export default Header;

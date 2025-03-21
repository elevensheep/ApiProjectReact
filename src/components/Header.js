import React, { useState } from "react";
import { Search, Bookmark, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";

const styles = {
    wrapper: {
      backgroundColor: "white",
      padding: "16px",
      display: "flex",
      flexDirection : "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding : "0px"
    }
};

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
        <header className="header" style={styles.wrapper}>
            <h1><Link to="/">책 좀 읽어라</Link></h1>
            <ul className="nav-menu">
                <li className="nav-item"><Link to="/category/politics">경제</Link></li>
                <li className="nav-item"><Link to="/category/sports">정치</Link></li>
                <li className="nav-item"><Link to="/category/economic">스포츠</Link></li>
                <li className="nav-item"><Link to="/category/society">사회</Link></li>
                <li className="nav-item"><Link to="/category/world">국제</Link></li>
            </ul>

            <nav className="nav">
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
                <div className="nav-links">
                    <Link to="/login" className="nav-link">
                        <p>로그인/회원가입</p>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;

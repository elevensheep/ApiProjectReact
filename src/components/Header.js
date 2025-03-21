import React from "react";
import { Link } from "react-router-dom";
import "./components.css";

function Header() {
    return (
        <header className="header">
            <h1><Link to="/">책 추천 사이트</Link></h1> {/* 🔥 '/'로 이동하도록 변경 */}
            <nav className="nav">
                <ul className="nav-menu">
                    <li className="nav-item"><Link to="/category/politics">정치</Link></li>
                    <li className="nav-item"><Link to="/category/economic">경제</Link></li>
                    <li className="nav-item"><Link to="/category/sports">스포츠</Link></li>
                    <li className="nav-item"><Link to="/category/society">사회</Link></li>
                    <li className="nav-item"><Link to="/category/world">국제</Link></li>
                </ul>
                <input type="text" className="search-bar" placeholder="검색어를 입력하세요" />
            </nav>
        </header>
    );
}

export default Header;

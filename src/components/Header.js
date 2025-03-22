import React, { useState, useEffect } from "react";
import { Search, Bookmark, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import axios from "axios";

const styles = {
  wrapper: {
    backgroundColor: "white",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
};

function Header() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const navigate = useNavigate();

  // 🔍 로그인 상태 확인
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("http://localhost:8080/api/books", {
          withCredentials: true, // JWT 쿠키 포함
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // 🔓 로그아웃 처리
  const handleLogout = () => {
    const logout = async () => {
      try {
        await axios.get("http://localhost:8080/logout", {
          withCredentials: true,
        });
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        navigate("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    };

    logout(); 
  };

  // 검색 실행 함수 (Enter 및 아이콘 클릭 시 실행)
  const executeSearch = () => {
    if (search.trim()) {
      console.log(search);
      navigate(`/booksearch?search=${search}`);
    }
  };

  // Enter 키 입력 시 검색 실행
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      executeSearch();
      navigate(`/booksearch?search=${search}`);
    }
  };

  // 아이콘 클릭 시 검색 실행
  const handleIconClick = () => {
    executeSearch();
  };

  return (
    <header className="header" style={styles.wrapper}>
      <h1>
        <Link to="/">책 좀 읽어라</Link>
      </h1>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/category/economic">경제</Link>
        </li>
        <li className="nav-item">
          <Link to="/category/politics">정치</Link>
        </li>
        <li className="nav-item">
          <Link to="/category/sports">스포츠</Link>
        </li>
        <li className="nav-item">
          <Link to="/category/society">사회</Link>
        </li>
        <li className="nav-item">
          <Link to="/category/world">국제</Link>
        </li>
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
          <Search className="search-icon" size={18} onClick={handleIconClick} />{" "}
          {/* 🔥 아이콘 클릭 시 검색 실행 */}
        </div>
        <div className="nav-links">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-link">
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              <p>로그인/회원가입</p>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

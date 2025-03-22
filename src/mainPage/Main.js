import React, { useEffect } from "react";
import Banner from "../components/Banner"; // ✅ `components` 폴더 안에 있는지 확인
import BookRecommendation from "./BookRecommendations"; // ✅ `components` 폴더 안에 있는지 확인
import axios from "axios";
import { useNavigate } from "react-router-dom";


const styles = {
    wrapper : {
        display : "flex",
        flexDirection : "column",
        width : "100%"
    }
}

function Main() {

    const navigate = useNavigate();

    return (
        <div style={styles.wrapper}>
            <Banner/> {/* 🔥 배너 추가 (항상 보이도록) */}
            <BookRecommendation /> {/* 🔥 추천 도서 */}
        </div>
    );
}

export default Main;

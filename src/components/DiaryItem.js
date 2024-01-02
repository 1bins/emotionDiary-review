import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
    const navigate = useNavigate();

    return(
        <div className="DiaryItem">
            <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                <img src={`${process.env.PUBLIC_URL}/images/emotion${emotion}.png`} />
            </div>
            <div className="info_wrapper" onClick={() => navigate(`/diary/${id}`)}>
                <div className="diary_date">{new Date(date).toLocaleDateString()}</div>
                <div className="diary_content_preview">{content}</div>
            </div>
            <div className="btn_wrapper">
                <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)}></MyButton>
            </div>
        </div>
    )
}

export default React.memo(DiaryItem);
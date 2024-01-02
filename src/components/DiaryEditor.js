import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App"

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import { getStringDate } from "./getStringDate";
import { emotionList } from "./emotionList"

const DiaryEditor = ( {originData, isEdit} ) => {
    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const contentFocus = useRef();

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");

    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    const handleSubmit = () => {
        if(content.length < 1){
            contentFocus.current.focus();
            return;
        }
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(isEdit){
                onEdit(originData.id, date, content, emotion)
            }else{
                onCreate(date, content, emotion);
            }
            navigate("/", {replace: true});
        }
    }

    const handleRemove = () => {
        if(window.confirm("정말 일기를 삭제하시겠습니까?")){
            onRemove(originData.id);
            navigate("/", {replace: true});
        }
    }

    return(
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>}
                rightChild={isEdit && <MyButton type={"negative"} text={"삭제하기"} onClick={handleRemove}></MyButton>}
            >
            </MyHeader>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="emotion_list_wrapper">
                        {emotionList.map((elem) => <EmotionItem key={elem.emotion_id} {...elem} onClick={setEmotion} isTarget={elem.emotion_id === emotion}></EmotionItem>)}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="text_wrapper">
                        <textarea
                            ref={contentFocus}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="오늘은 어땠나요?"
                        >
                        </textarea>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={() => navigate("-1")}></MyButton>
                        <MyButton type={"positive"} text={"작성완료"} onClick={handleSubmit}></MyButton>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor;
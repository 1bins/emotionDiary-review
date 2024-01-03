import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../components/getStringDate";
import { emotionList } from "../components/emotionList";

const Diary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState();

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(elem => parseInt(elem.id) === parseInt(id));
            if(targetDiary){
                setData(targetDiary);
            }else{
                alert("저장된 일기가 없습니다");
                navigate("/", {replace: true})
            }
        }
    }, [id, diaryList]);

    if(!data){
        return <div className="DiaryPage">로딩중입니다...</div>
    }else{
        const targetEmotion = emotionList.find(elem => parseInt(elem.emotion_id) === parseInt(data.emotion));

        return(
            <div className="DiaryPage">
                <MyHeader
                    headText={`${getStringDate(new Date(parseInt(data.date)))} 기록`}
                    leftChild={<MyButton text={"< 뒤로 가기"} onClick={() => navigate(-1)}></MyButton>}
                    rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)}></MyButton>}
                >
                </MyHeader>
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={targetEmotion.emotion_img} />
                            <div className="emotion_descript">{targetEmotion.emotion_dsc}</div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}

export default Diary;
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);

    const [targetData, setTargetData] = useState();

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(elem => parseInt(elem.id) === parseInt(id));
            if(targetDiary){
                setTargetData(targetDiary);
            }else{
                alert("저장된 일기가 없습니다");
                navigate("/", {replace: true})
            }
        }
    }, [id, diaryList]);

    return(
        <div>
            {targetData && <DiaryEditor targetData={targetData} isEdit={true}></DiaryEditor>}
        </div>
    )
}

export default Edit;
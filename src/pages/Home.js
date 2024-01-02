import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import DiaryList from "../components/DiaryList"
import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [curDate, setCurDate] = useState(new Date());
    const [data, setData] = useState([]);

    const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    const increaseMonth = () => setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    const decreaseMonth = () => setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));

    useEffect(() => {
        const monthFirst = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
        const monthLast = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59);

        setData(diaryList.filter((elem) => monthFirst <= elem.date && elem.date <= monthLast));
    }, [curDate, diaryList]);

    return(
        <div>
            <MyHeader
                headText={headerText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
                rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
            >
            </MyHeader>
            <DiaryList diaryList={data}></DiaryList>
        </div>
    )
}

export default Home;
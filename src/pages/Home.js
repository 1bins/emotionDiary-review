import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";


const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    const [curDate, setCurDate] = useState(new Date());
    const [data, setData] = useState([]);

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    const decreaseMonth = () => setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    const increaseMonth = () => setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));

    useEffect(() => {
        const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
        const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59);

        setData(diaryList.filter(elem => firstDay <= elem.date && elem.date <= lastDay));
    }, [curDate, diaryList]);

    return(
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
                rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
            >
            </MyHeader>
            <DiaryList diaryList={data}></DiaryList>
        </div>
    )
}

export default Home;
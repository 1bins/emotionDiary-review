import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortTypeList = [
    {value: "latest", name: "최신 순"},
    {value: "oldest", name: "오래된 순"}
];

const filterTypeList = [
    {value: "all", name: "전체보기"},
    {value: "good", name: "좋은 감정만"},
    {value: "bad", name: "힘든 감정만"},
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return(
        <select className="ControlMenu" value={value} onChange={e => onChange(e.target.value)}>
            {optionList.map((elem, idx) => <option key={idx} value={elem.value}>{elem.name}</option>)}
        </select>
    )
});

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();

    const [sortType, setSortType] = useState("latest");
    const [filterType, setFilterType] = useState("all");

    const getProcessedData = () => {
        // JSON
        const copyList = JSON.parse(JSON.stringify(diaryList));
        
        // compare
        const compare = (a, b) => {
            if(sortType === "latest"){
                return parseInt(b.date) - parseInt(a.date);
            }else{
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        // filter
        const emotionFilter = (elem) => {
            if(filterType === "good"){
                return parseInt(elem.emotion) <= 3;
            }else {
                return parseInt(elem.emotion) > 3;
            }
        }
        const filterdList = filterType === "all" ? copyList : copyList.filter((elem) => emotionFilter(elem));
        const sortedList = filterdList.sort(compare);
        return sortedList;
    }

    return(
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortTypeList}
                    >
                    </ControlMenu>
                    <ControlMenu
                        value={filterType}
                        onChange={setFilterType}
                        optionList={filterTypeList}
                    >
                    </ControlMenu>
                </div>
                <div className="right_col">
                    <MyButton type={"positive"} text={"새 일기쓰기"} onClick={() => navigate("/new")}></MyButton>
                </div>
            </div>
            {getProcessedData().map((elem) => <DiaryItem key={elem.id} {...elem}></DiaryItem>)}
        </div>
    )
}

export default DiaryList;
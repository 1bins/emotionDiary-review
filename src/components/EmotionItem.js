import React from "react";

const EmotionItem = ({ emotion_id, emotion_img, emotion_dsc, onClick, isClicked }) => {
    return(
        <div className={["EmotionItem", isClicked ? `EmotionItem_on EmotionItem_on_${emotion_id}` : "EmotionItem_off"].join(" ")} onClick={() => onClick(emotion_id)}>
            <img src={emotion_img} />
            <span>{emotion_dsc}</span>
        </div>
    )
}

export default React.memo(EmotionItem);
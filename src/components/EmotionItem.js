import React from "react";

const EmotionItem = ({emotion_id, emotion_img, emotion_dsc, onClick, isTarget}) => {
    return(
        <div className={["EmotionItem", isTarget ? `EmotionItem_on EmotionItem_on_${emotion_id}` : "EmotionItem_off"].join(" ")} onClick={() => onClick(emotion_id)}>
            <img src={emotion_img} />
            <span>{emotion_dsc}</span>
        </div>
    )
}

export default React.memo(EmotionItem);
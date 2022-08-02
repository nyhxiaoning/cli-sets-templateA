
/** 获取任务状态显示文本 */
export function getTaskStateText(type: string) {
    let text = ""
    switch (type) {
        case "pending":
            text = "未开始"
            break;
        case "in_progress":
            text = "进行中"
            break;
        case "completed":
            text = "已完成"
            break;
        case "closed":
            text = "关闭"
            break;
    }
    return text
}

/** 获取任务状态tag类型 */
export function getTagTypeByTaskTask(type: string) {
    let tagType = ""
    switch (type) {
        case "pending":
            tagType = ""
            break;
        case "in_progress":
            tagType = "warning"
            break;
        case "completed":
            tagType = "success"
            break;
        case "closed":
            tagType = "info"
            break;
    }
    return tagType
}
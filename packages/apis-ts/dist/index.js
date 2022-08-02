import https from "./httpaxios"; //导入https方法
/**
 * 获取用户信息2222222222222
 */
const getUser = (data) => {
    return https.get("user", `search?id=${data}}`, undefined);
};
/**
 * 获取周课表信息
 * @param {semesterId} params
 * @returns
 */
const getCommentScheduleWeek = () => {
    return https.get("mock2", "712441/13785004");
};
/**
 * 获取日课表信息
 * @param {semesterId, teacherId} params
 * @returns
 */
const getCommentScheduleDay = async () => {
    return await https.get("mock", `712441/api-sch/comment/schedule/day/calendar/27/122`, undefined);
    // return request({
    //   url: `http://127.0.0.1:4523/mock/712441/api-sch/comment/schedule/day/calendar/27/122`,
    //   method: 'get',
    //   params,
    // })
};
/**
 * 创建一个用户
 * @param data
 * @returns
 */
const createUser = (data) => {
    return https.post("user", "createuser", undefined, data);
};
// TODO:查找每一个课程对应的曲谱信息
const getSingleMusicDetails = async (data) => {
    return await https.post('mock', `712444/api-base/cur/operns/3017`, undefined, data);
};
// TODO:查找当前的所有的视频列表信息
//  const getVideos=()=> {
//     return https.post('mock',`712444/api-base/cur/opern/labels/videos/41`);
// }
//  const httpsFn = ()=> https;//尝试这样导出https模块
const add = (a, b) => a + b;
export const userApi = {
    httpFn: () => {
        return https;
    },
    addFn: () => {
        return add;
    },
    getUserFn: () => {
        return getUser("1");
    },
    createUserFn: async () => {
        return createUser;
    },
    getCommentScheduleWeekFn: async () => {
        return await getCommentScheduleWeek;
    },
    getCommentScheduleDayFn: async () => {
        return getCommentScheduleDay;
    },
    getSingleMusicDetailsFn: async () => {
        return getSingleMusicDetails;
    },
    getTextbook: async () => {
        return await https.get("mock2", "712441/14579796", undefined, undefined);
    },
    getSection: async () => {
        return await https.get("mock2", "712441/14579796", undefined, undefined);
    },
    getQuestion: async () => {
        return await https.get("mock", "712441/api-base/cur/questions", undefined, undefined);
    }
};

import https from "../httpaxios";//导入https方法



// 获取各个年级教材
 const getTextbook =async () => {
    return  await https.get("mock2","712441/14579796",undefined,undefined)
  };
   const getSection = async() => {
    return await  https.get("mock2","712441/14579796",undefined,undefined)

  };

   const getQuestion =async () => {
    return  await https.get("mock","712441/api-base/cur/questions",undefined,undefined)

  }

const commonObj = {
    getQuestionFn:async ()=> await getQuestion(),
    getSectionFn:async ()=>await getSection(),
    getTextbookFn:async ()=>await getTextbook()
}
  export default commonObj
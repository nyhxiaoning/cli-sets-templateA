import https from "@/utils/https/https"

// 获取系统提供的项目模板
export async function TemplateList() {
  return await https.get("project", "template_list", undefined);
}

// 根据条件搜索项目
export async function Searchs(data: any) {
  // let parm = {
  //   "style": "template",
  //   "conjunction": "and",
  //   "conditions": [
  //     {
  //       "name": "plan",
  //       "args": ["{project_plan_id}"],//项目集的id
  //     }
  //   ]
  // }
  return await https.get("project", `search`, undefined, data);
}

//获取收藏的项目集合
export async function StarList() {
  return await https.get("project", "starlist", undefined);
}

//收藏指定的项目
export async function Star(data: object) {
  return await https.post("project", "star", undefined, data);
}

//将项目标记为喜欢
export async function Like(data: object) {
  return await https.post("project", "like", undefined, data);
}

//根据条件搜索项目
export async function conditionSearch(data: object) {
  return await https.post("project", "search",undefined, data);
}

// ----------------------

//获取项目集
export async function List<T>() {
  return await https.get<T>("plan", "list", undefined);
}

//创建项目集
export async function Creates(data: object) {
  return await https.post("plan", "create", undefined, data);
}

//删除项目集
export async function Deletes(data: object) {
  return await https.post("plan", "delete", undefined, data);
}

// 归档项目集
export async function Archive(id:string) {
  return await https.post("plan", `archive?id=${id}`, undefined);
}

//编辑项目集
export async function Renames(data:any) {
  return await https.post("plan", "rename", undefined, data);
}

// 获取项目集的项目列表
export async function ProjectsetProject(id:string) {
  return await https.get("plan", `project?id=${id}`, undefined);
}

// 为项目集添加项目
export async function Addproject(data:any) {
  return await https.post("plan", 'UpdateProject', undefined, data);
}

// 获取项目分组的树状结构
export async function GroupList(data:any) {
  return await https.post("project", "group_list", undefined, data);
}
// 获取支持项目分组的字段集合
export async function group_fieldcollection() {
  return await https.get("project", "group_fieldcollection", undefined);
}

// -----------------
// 团队查询
export async function Query(data:string) {
  return await https.get("team", `query?kw=${data}`, undefined);
}

// 获取项目组件的类别
export async function ClassifyList() {
  return await https.get("project_component", 'classifylist', undefined);
}
// 获取可用的项目组件
export async function PossibleComponents(classify:string[],kw:string) {
  var str = classify.join(",")
  return await https.get("project_component", `query?classify=${str}&kw=${kw}`, undefined);
}
// 创建一个新的项目
export async function Create(data: object) {
  return await https.post("project", "create", undefined, data);
}
// 复制已有项目
export async function Copy(data: object) {
  return await https.post("project", "copy", undefined, data);
}
// 通过关键字快速索引项目
export async function projectQuery(data:string) {
  return await https.get("project", `query?keyword=${data}`, undefined);
}
// 获取系统提供的项目模板的分组
export async function TemplateGroup() {
  return await https.get("project", 'template_group', undefined);
}
// 获取系统提供的项目模板
export async function TemplateListTwo(classify:string[],kw:string) {
  var str = classify.join(",")
  return await https.get("project", `template_list?classify=${str}&kw=${kw}`, undefined);
}
// 基于模板创建项目
export async function CreateTempLate(data:object) {
  return await https.post("project", 'templatecreate', undefined, data);
}

//列出工作项下拉框所有类型
export async function workItemData() {
  return await https.get("task_type",'list', undefined);
}
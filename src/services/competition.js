import {
  COMPETITION
} from '@/services/api'
import { request, METHOD } from '@/utils/request'
 
// 获取比赛列表 分页
export async function getCompetitionPageList(data) {
  return request(COMPETITION+'/page', METHOD.GET, data)
}
// 获取比赛权限列表
export async function getCompetitionRoleList(data) {
  return request(COMPETITION+'/names', METHOD.GET, data)
}
// 新增比赛
export async function addCompetition(iscreated,data) {
  if(iscreated){
    return request(COMPETITION, METHOD.POST, data)
  }else{
    return updateCompetition(data)
  }
}
// 删除比赛
export async function deleteCompetition(data) {
  return request(COMPETITION, METHOD.DELETE, data)
}
// 比赛详情
export async function competitionDetail(data) {
  return request(COMPETITION, METHOD.GETID, data)
}
// 修改比赛
export async function updateCompetition(data) {
  return request(COMPETITION, METHOD.PUT, data)
}
 // 报名信息统计看板
export async function signUp(data) {
  return request(COMPETITION+'/sign-up', METHOD.GETID, data)
}
// 报名信息列表
export async function signUpPge(data) {
  console.log('data', data)
  return request(COMPETITION+'/sign-up/page', METHOD.GET, data)
}

// 导出-比赛接口列表
export async function exportFlile(data) {
  return request(COMPETITION+'/export', METHOD.GET, data,{
    responseType: 'blob'
  })
}
// 导出-比赛详情
export async function exportFlileInfo(data) {
  return request(COMPETITION+'/pdfs', METHOD.GETID, data,{
    responseType: 'blob'
  })
}
// 导出-比赛报名信息
export async function exportFilebaomingxinxi(data) {
  return request(COMPETITION+'/sign-up/export', METHOD.GET, data,{
    responseType: 'blob'
  })
}
 

// 获取比赛统计列表 分页
export async function  speedingGamesInfo(isgeren,data) {
  if(isgeren){
    return request(COMPETITION+'/statistics/speeding-games', METHOD.GETID, data)
  }else{
    return checkGamesInfo(data)
  }
}
 
// 获取比赛统计列表 分页 个人打卡
export async function  checkGamesInfo(data) {
  
  return request(COMPETITION+'/statistics/check-in-games', METHOD.GETID, data)
}
 
 
  // 获取比赛列表 分页
export async function speedingGamesList(isgeren,data) {
  if(isgeren){
    return request(COMPETITION+'/statistics/speeding-games/page', METHOD.GET, data)
  }else{
    return  checkGamesList(data)
  }
}
  // 获取比赛列表 分页
  export async function checkGamesList(data) {
    return request(COMPETITION+'/statistics/check-in-games/page', METHOD.GET, data)
  }

  
  export async function speedingGamesExport(isgeren,data) {
    if(isgeren){
      return request(COMPETITION+'/statistics/speeding-games/export', METHOD.GET, data,{
        responseType: 'blob'
      })
    }else{
      return checkGamesExport(data)
    }
  }
  export async function checkGamesExport(data) {
    return request(COMPETITION+'/statistics/check-in-games/export', METHOD.GET, data,{
      responseType: 'blob'
    })
  }
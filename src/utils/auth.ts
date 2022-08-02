// 该模块提供了 获取管理员信息、设置管理员信息、删除管理员信息 的方法
import Cookies from 'js-cookie'

export function getIsSuperAdmin() {
    return Cookies.get('administratorsKey') // 从缓存中读取管理员信息
  }
  
  export function setIsSuperAdmin(isSuperAdmin :any) {
    return Cookies.set('administratorsKey', isSuperAdmin) // 将管理员信息写入缓存
  }
  
  export function removeIsSuperAdmin() {
    return Cookies.remove('administratorsKey') // 删除管理员信息
  }

  // 项目id
  // export function getIdOfTheItem() {
  //   return Cookies.get('IdOfTheItemKey') // 从缓存中读取管理员信息
  // }
  
  // export function setIdOfTheItem(id :any) {
  //   return Cookies.set('IdOfTheItemKey', id) // 将管理员信息写入缓存
  // }
  
  // export function removeIdOfTheItem() {
  //   return Cookies.remove('IdOfTheItemKey') // 删除管理员信息
  // }
import {request} from "@/api/request";

export function getUserNum(){
  return request({
    url: '/user/userNum',
    method: 'GET',
  })
}

export function getList(params){
  return request({
    url: '/categories',
    method: 'GET',
    params
  })
}

export function getTagList(params){
  return request({
    url: '/tags',
    method: 'GET',
    params,
  })
}
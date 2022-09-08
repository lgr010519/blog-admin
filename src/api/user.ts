import {request} from "@/api/request";

export function getList(params){
    return request({
        url: '/user',
        method: 'GET',
        params,
    })
}

export function remove(data){
    return request({
        url: '/user',
        method: 'DELETE',
        data,
    })
}
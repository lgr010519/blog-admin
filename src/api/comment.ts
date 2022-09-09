import {request} from "@/api/request";

export function getList(params){
    return request({
        url: '/comment',
        method: 'GET',
        params,
    })
}

export function updateCommentStatus(data){
    return request({
        url: '/comment',
        method: 'PUT',
        data,
    })
}

export function remove(data){
    return request({
        url: '/comment',
        method: 'DELETE',
        data,
    })
}
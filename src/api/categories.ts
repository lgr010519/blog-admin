import {request} from "@/api/request";

export function getList(params){
    return request({
        url: '/categories',
        method: 'GET',
        params,
    })
}

export function create(data){
    return request({
        url: '/categories',
        method: 'POST',
        data,
    })
}

export function update(data){
    return request({
        url: '/categories',
        method: 'PUT',
        data,
    })
}

export function remove(data){
    return request({
        url: '/categories',
        method: 'DELETE',
        data,
    })
}
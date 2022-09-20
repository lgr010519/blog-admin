import {request} from "@/api/request";

export function getList(params){
    return request({
        url: '/tags',
        method: 'GET',
        params,
    })
}

export function create(data){
    return request({
        url: '/tags',
        method: 'POST',
        data,
    })
}

export function update(data){
    return request({
        url: '/tags',
        method: 'PUT',
        data,
    })
}

export function updateStatus(data){
    return request({
        url: `/tags/status`,
        method: 'PUT',
        data,
    })
}

export function remove(data){
    return request({
        url: '/tags',
        method: 'DELETE',
        data,
    })
}
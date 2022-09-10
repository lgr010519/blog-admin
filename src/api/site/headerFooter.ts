import {request} from "@/api/request";

export function queryHeaderFooter(){
    return request({
        url: '/config/hf',
        method: 'GET',
    })
}

export function addHeaderFooter(data){
    return request({
        url: '/config/hf',
        method: 'POST',
        data,
    })
}

export function updateHeaderFooter(data){
    return request({
        url: '/config/hf',
        method: 'PUT',
        data,
    })
}
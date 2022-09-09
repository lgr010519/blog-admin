import {request} from "@/api/request";

export function queryHome(){
    return request({
        url: '/config/home',
        method: 'GET',
    })
}

export function addHome(data){
    return request({
        url: '/config/home',
        method: 'POST',
        data,
    })
}

export function updateHome(data){
    return request({
        url: '/config/home',
        method: 'PUT',
        data,
    })
}
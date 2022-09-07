import {request} from "@/api/request";

export function queryAbout(){
    return request({
        url: '/about',
        method: 'GET',
    })
}

export function addAbout(data){
    return request({
        url: '/about',
        method: 'POST',
        data,
    })
}

export function updateAbout(data){
    return request({
        url: '/about',
        method: 'PUT',
        data,
    })
}
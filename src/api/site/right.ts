import {request} from "@/api/request";

export function queryIntroduction(){
    return request({
        url: '/config/right/introduction',
        method: 'GET',
    })
}

export function addIntroduction(data){
    return request({
        url: '/config/right/introduction',
        method: 'POST',
        data,
    })
}

export function updateIntroduction(data){
    return request({
        url: '/config/right/introduction',
        method: 'PUT',
        data,
    })
}

export function queryAd(){
    return request({
        url: '/config/right/ad',
        method: 'GET',
    })
}

export function addAd(data){
    return request({
        url: '/config/right/ad',
        method: 'POST',
        data,
    })
}

export function updateAd(data){
    return request({
        url: '/config/right/ad',
        method: 'PUT',
        data,
    })
}
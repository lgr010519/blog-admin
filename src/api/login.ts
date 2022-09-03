import {request} from "@/api/request";

export function login(data){
    return request({
        url: '/admin/login',
        method: 'POST',
        data,
    })
}
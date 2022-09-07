import {request} from "@/api/request";

export function upload(data){
    return request({
        url: '/upload',
        method: 'POST',
        data,
    })
}
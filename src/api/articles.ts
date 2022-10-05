import {request} from "@/api/request";

export function getList(params) {
    return request({
        url: '/articles',
        method: 'GET',
        params,
    })
}

export function create(data) {
    return request({
        url: '/articles',
        method: 'POST',
        data,
    })
}

export function update(data) {
    return request({
        url: '/articles',
        method: 'PUT',
        data,
    })
}

export function queryArticles(params) {
    return request({
        url: `/articles/${params.id}/edit`,
        method: 'GET',
    })
}

export function updateStatus(data) {
    return request({
        url: '/articles/status',
        method: 'PUT',
        data,
    })
}

export function updatePublishStatus(data) {
    return request({
        url: '/articles/publishStatus',
        method: 'PUT',
        data,
    })
}

export function remove(data) {
    return request({
        url: '/articles',
        method: 'DELETE',
        data,
    })
}

export function updateCollectStatus(data) {
    return request({
        url: '/articles/collectStatus',
        method: 'POST',
        data,
    })
}

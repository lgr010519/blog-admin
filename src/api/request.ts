import axios from "axios";

export const request = (config) => {
    const http = axios.create({
        baseURL: 'http://127.0.0.1:7001/api/v1',
        // timeout: 5000,
    })

    // 请求拦截
    http.interceptors.request.use((config)=>{
        if (config.method === 'put' || config.method === 'delete'){
            config.url += config.data._id || config.data.id
        }
        return config
    },(error)=>{
        console.log('---error---',error)
    })
    // 响应拦截
    http.interceptors.response.use((res)=>{
        return res.data ? res.data : res
    },(error)=>{
        console.log('---error---',error.response)
    })

    return http(config)
}
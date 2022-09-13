import Mock from 'mockjs'
import setupMock from "@/utils/setupMock";
import qs from "query-string";

const Random = Mock.Random

const data = Mock.mock({
    'list|55': [
        {
            '_id|8': /[A-Z][a-z][-][0-9]/,
            'name|4-8': /[A-Z]/,
            articleNum: 0,
            status: true,
            createTime: Random.datetime(),
            updateTime: Random.datetime(),
        }
    ]
})

// setupMock({
//     setup(){
//         Mock.mock(new RegExp('/api/v1/tags/status'),(params)=>{
//             switch (params.type) {
//                 case 'PUT':
//                     const body = JSON.parse(params.body)
//                     const index = data.list.findIndex(item => item._id === body.id)
//                     data.list[index] = {...data.list[index], ...body}
//
//                     return {
//                         code: 0,
//                         data: null,
//                         msg: '标签修改成功'
//                     }
//             }
//         })
//         Mock.mock(new RegExp('/api/v1/tags'),(params)=>{
//             switch (params.type) {
//                 case 'GET':
//                     const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query
//                     const p = page as number
//                     const ps = pageSize as number
//
//                     return {
//                         list: data.list.slice((p - 1) * ps, p * ps),
//                         totalCount: 55,
//                     }
//                 case 'POST':
//                     const { name } = JSON.parse(params.body)
//                     const returnData = Mock.mock({
//                         '_id|8': /[A-Z][a-z][-][0-9]/,
//                         name,
//                         articleNum: 0,
//                         status: true,
//                         createTime: Random.datetime(),
//                         updateTime: Random.datetime(),
//                     })
//                     data.list.unshift(returnData)
//
//                     return {
//                         code: 0,
//                         data: returnData,
//                         msg: '标签添加成功'
//                     }
//                 case 'PUT':
//                     const body = JSON.parse(params.body)
//                     const index = data.list.findIndex(item => item._id === body._id)
//                     data.list[index] = {...data.list[index], ...body}
//
//                     return {
//                         code: 0,
//                         data: null,
//                         msg: '标签修改成功'
//                     }
//                 case 'DELETE':
//                     const delBody = JSON.parse(params.body)
//                     const idx = data.list.findIndex(item => item._id === delBody._id)
//                     data.list.splice(idx, 1)
//
//                     return {
//                         code: 0,
//                         data: null,
//                         msg: '标签删除成功'
//                     }
//             }
//         })
//     }
// })
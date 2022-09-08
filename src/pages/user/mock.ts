import Mock from 'mockjs'
import setupMock from "@/utils/setupMock";
import qs from "query-string";

const Random = Mock.Random

const data = Mock.mock({
    'list|55': [
        {
            '_id|10': /[A-Z][a-z][-][0-9]/,
            'uid|10': /[A-Z][a-z][-][0-9]/,
            'provider|1': ['local','github'],
            email: Random.email(),
            password: '',
            nickName: Mock.mock('@cname'),
            avatar: Random.image('100x100', '#FF6600'),
            introduction: Random.cparagraph(),
            loginTime: Random.datetime(),
            registerTime: Random.datetime(),
            'articleIds|1-10': Random.guid(),
        }
    ]
})

setupMock({
    setup(){
        Mock.mock(new RegExp('/api/v1/user'),(params)=>{
            switch (params.type) {
                case 'GET':
                    const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query
                    const p = page as number
                    const ps = pageSize as number

                    return {
                        list: data.list.slice((p - 1) * ps, p * ps),
                        totalCount: 55,
                    }
                case 'DELETE':
                    const delBody = JSON.parse(params.body)
                    const idx = data.list.findIndex(item => item._id === delBody._id)
                    data.list.splice(idx, 1)

                    return {
                        code: 0,
                        data: null,
                        msg: '用户删除成功'
                    }
            }
        })
    }
})
import Mock from 'mockjs'
import setupMock from "@/utils/setupMock";
import qs from "query-string";

const Random = Mock.Random

const data = Mock.mock({
    'list|55': [
        {
            "targetReplayId":"",
            "targetReplayContent":"",
            "currentReplayContent":"好，不错",
            "commentTime":1611745373,
            "auditTime":1637558682,
            "auditStatus":"1",
            "_id":"6011485dc4ae0128013d3246",
            "avatar":"http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
            "email":"123456789@qq.com",
            "nickName":"永不放弃",
            "articleId":"601134b4c4ae0128013d322d",
            "articleTitle":"测试评论文章"
        },
        {
            "targetReplayId":"",
            "targetReplayContent":"",
            "currentReplayContent":"good",
            "commentTime":1619316296,
            "auditTime":1619316309,
            "auditStatus":"2",
            "_id":"6084ce48e268db458626591a",
            "avatar":"http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
            "email":"123456789@qq.com",
            "nickName":"永不放弃",
            "articleId":"601134b4c4ae0128013d322d",
            "articleTitle":"测试评论文章"
        },
        {
            "targetReplayId":"6084ce48e268db458626591a",
            "targetReplayContent":"good",
            "currentReplayContent":"这篇文章写得不错",
            "commentTime":1623048202,
            "auditTime":1630660397,
            "auditStatus":"3",
            "_id":"60bdc00ac4b76ef12cd151aa",
            "avatar":"http://www.nevergiveupt.top/user_avatar.png",
            "email":"13412345678@163.com",
            "nickName":"Never",
            "articleId":"601134b4c4ae0128013d322d",
            "articleTitle":"测试评论文章"
        },
        {
            "targetReplayId":"",
            "targetReplayContent":"",
            "currentReplayContent":"好的",
            "commentTime":1630660872,
            "auditTime":1630660920,
            "auditStatus":"1",
            "_id":"6131e908658ef2c31921c822",
            "avatar":"http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
            "email":"123456789@qq.com",
            "nickName":"永不放弃",
            "articleId":"60967c75c4b76ef12cd14bb5",
            "articleTitle":"等额本金与等额本息的区别"
        },
        {
            "targetReplayId":"",
            "targetReplayContent":"",
            "currentReplayContent":"非常好",
            "commentTime":1631589328,
            "auditTime":1631590200,
            "auditStatus":"1",
            "_id":"614013d0936767b09fbba6a2",
            "avatar":"http://www.nevergiveupt.top/user_avatar.png",
            "email":"3222415705@qq.com",
            "nickName":"南风晚起",
            "articleId":"60967c75c4b76ef12cd14bb5",
            "articleTitle":"等额本金与等额本息的区别"
        }
    ]
})

setupMock({
    setup(){
        Mock.mock(new RegExp('/api/v1/comment'),(params)=>{
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
                        msg: '评论删除成功'
                    }
            }
        })
    }
})
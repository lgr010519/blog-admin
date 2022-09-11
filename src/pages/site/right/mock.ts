import Mock from 'mockjs'
import setupMock from "@/utils/setupMock";

const data = {
    "tags": [
        "4年前端开发经验"
    ],
    "showPosition": [
        "文章",
        "文章详情"
    ],
    "createTime": 1598256829,
    "updateTime": 1600164867,
    "_id": "5f4376bd94c942f8bc6daab1",
    "friendLink": [
        {
            "_id": "5f4376bd94c942f8bc6daab2",
            "link": "https://xuwenliu.github.io/",
            "icon": "github"
        },
        {
            "_id": "5f4376bd94c942f8bc6daab3",
            "link": "https://segmentfault.com/u/xuwenliu/answers",
            "icon": "sf"
        },
        {
            "_id": "5f4376bd94c942f8bc6daab4",
            "link": "https://www.zhihu.com/people/xu-wen-liu-83/posts",
            "icon": "zhihu"
        }
    ],
    "nickName": "NeverGiveUpT",
    "desc": "专注于WEB和移动前端开发"
}

const adData = {
    "showPosition": [
        "文章",
        "文章详情"
    ],
    "createTime": 1598257275,
    "updateTime": 0,
    "_id": "5f43787b94c942f8bc6daac1",
    "imgs": [
        {
            "_id": "5f43787b94c942f8bc6daac2",
            "imgUrl": "https://img.alicdn.com/tfs/TB1v0eeB4z1gK0jSZSgXXavwpXa-2880-574.png",
            "link": "https://www.aliyun.com/minisite/goods?userCode=h55rc1yh"
        }
    ]
}

const recommendData = [
    {
        "showPosition": [
            "文章",
            "文章详情"
        ],
        "isVip": true,
        "createTime": 1600666609,
        "updateTime": 0,
        "_id": "5f683bf184530328babcafc5",
        "project": "2",
        "name": "沉默的真相",
        "platform": "爱奇艺",
        "cover": "https://pic7.iqiyipic.com/image/20200916/33/7f/a_100403629_m_601_m9_260_360.jpg?caplist=jpg,webp",
        "link": "https://www.iqiyi.com/v_2g5a5i86730.html?vfrm=pcw_home&vfrmblk=B&vfrmrst=fcs_0_p11"
    },
    {
        "showPosition": [
            "文章",
            "文章详情"
        ],
        "isVip": false,
        "createTime": 1600666718,
        "updateTime": 1600666734,
        "_id": "5f683c5e84530328babcafca",
        "project": "2",
        "name": "在劫难逃",
        "platform": "爱奇艺",
        "cover": "https://pic5.iqiyipic.com/image/20200916/1b/5a/a_100288329_m_601_m17_260_360.jpg",
        "link": "https://www.iqiyi.com/v_e1224uing8.html"
    },
    {
        "showPosition": [
            "文章",
            "文章详情"
        ],
        "isVip": true,
        "createTime": 1607064764,
        "updateTime": 0,
        "_id": "5fc9dcbc84530328babcb31c",
        "project": "2",
        "name": "鹿鼎记",
        "platform": "爱奇艺",
        "cover": "https://pic9.iqiyipic.com/image/20201116/90/e3/a_100433981_m_601_m2_260_360.jpg?caplist=jpg,webp,avif",
        "link": "https://www.iqiyi.com/v_24h60bowzyk.html"
    },
    {
        "showPosition": [
            "文章",
            "文章详情"
        ],
        "isVip": true,
        "createTime": 1607064846,
        "updateTime": 0,
        "_id": "5fc9dd0e84530328babcb31d",
        "project": "1",
        "name": "急先锋",
        "platform": "爱奇艺",
        "cover": "https://pic2.iqiyipic.com/image/20201113/c3/8f/v_131397337_m_601_m20_260_360.jpg?caplist=jpg,webp",
        "link": "https://www.iqiyi.com/v_19rs77glak.html"
    },
    {
        "showPosition": [
            "文章",
            "文章详情"
        ],
        "isVip": true,
        "createTime": 1609811064,
        "updateTime": 0,
        "_id": "5ff3c478432301f0e7d89aca",
        "project": "2",
        "name": "黑白禁区",
        "platform": "爱奇艺",
        "cover": "https://pic0.iqiyipic.com/image/20201228/09/95/a_100398089_m_601_m8_260_360.jpg?caplist=jpg,webp,avif",
        "link": "https://www.iqiyi.com/v_1b3wei2lmj4.html"
    },
    {
        "showPosition": [
            "文章",
            "文章详情",
            "首页",
            "分类",
        ],
        "isVip": true,
        "createTime": 1609811135,
        "updateTime": 0,
        "_id": "5ff3c4bf432301f0e7d89acb",
        "project": "2",
        "name": "巡回检查组",
        "platform": "优酷",
        "cover": "https://pic7.iqiyipic.com/image/20201214/08/2d/a_100438674_m_601_260_360.jpg",
        "link": "https://v.youku.com/v_show/id_XNDk2MzA5Nzc2MA==.html"
    }
]

setupMock
({
    setup() {
        Mock.mock(new RegExp('/api/v1/config/right/introduction'), (params) => {
            switch (params.type) {
                case 'GET':

                    return {
                        code: 0,
                        data,
                        msg: '个人简介信息获取成功'
                    }
                case 'POST':
                    const postBody = JSON.parse(params.body)

                    return {
                        code: 0,
                        data: postBody,
                        msg: '个人简介信息添加成功'
                    }
                case 'PUT':
                    const body = JSON.parse(params.body)

                    return {
                        code: 0,
                        data: body,
                        msg: '个人简介信息修改成功'
                    }
            }
        })
        Mock.mock(new RegExp('/api/v1/config/right/ad'), (params) => {
            switch (params.type) {
                case 'GET':

                    return {
                        code: 0,
                        data: adData,
                        msg: '广告设置信息获取成功'
                    }
                case 'POST':
                    const postBody = JSON.parse(params.body)

                    return {
                        code: 0,
                        data: postBody,
                        msg: '广告设置信息添加成功'
                    }
                case 'PUT':
                    const body = JSON.parse(params.body)

                    return {
                        code: 0,
                        data: body,
                        msg: '广告设置信息修改成功'
                    }
            }
        })
        Mock.mock(new RegExp('/api/v1/config/right/recommend'), (params) => {
            switch (params.type) {
                case 'GET':

                    return {
                        code: 0,
                        list: recommendData,
                        totalCount: 6,
                        msg: '推荐设置信息获取成功'
                    }
                case 'POST':
                    const postBody = JSON.parse(params.body)
                    recommendData.unshift(postBody)

                    return {
                        code: 0,
                        data: postBody,
                        msg: '推荐设置信息添加成功'
                    }
                case 'PUT':
                    const body = JSON.parse(params.body)
                    const index = recommendData.findIndex(item => item._id === body._id)
                    recommendData[index] = {...recommendData[index],...body}

                    return {
                        code: 0,
                        data: body,
                        msg: '推荐设置信息修改成功'
                    }
                case 'DELETE':
                    const delBody = JSON.parse(params.body)
                    const idx = recommendData.findIndex(item => item._id === delBody._id)
                    recommendData.splice(idx, 1)

                    return {
                        code: 0,
                        data: null,
                        msg: '推荐设置信息删除成功'
                    }
            }
        })
    }
})
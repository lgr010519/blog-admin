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
        "showPosition":[
            "文章",
            "文章详情"
        ],
        "createTime":1598257275,
        "updateTime":0,
        "_id":"5f43787b94c942f8bc6daac1",
        "imgs":[
            {
                "_id":"5f43787b94c942f8bc6daac2",
                "imgUrl":"https://img.alicdn.com/tfs/TB1v0eeB4z1gK0jSZSgXXavwpXa-2880-574.png",
                "link":"https://www.aliyun.com/minisite/goods?userCode=h55rc1yh"
            }
        ]
    }

setupMock({
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
    }
})
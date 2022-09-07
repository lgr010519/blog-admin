import Mock from 'mockjs'
import setupMock from "@/utils/setupMock";
import qs from "query-string";

const data = {
    tags: ['vue','react','nodejs'],
    createTime: 12345678,
    updateTime: 87654321,
    showResume: false,
    _id: '5139857394085723',
    desc: '应届生一枚',
    imgs: [
        {
            _id: '9308457234890573',
            imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ffe%2F11%2F97%2Ffe119792285b42e687ebf4367f77c8de.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665137582&t=7918e46c0171433bd4cf2fe251ffc9fb',
            link: ''
        },
        {
            _id: '9308457234890573',
            imgUrl: 'https://img2.baidu.com/it/u=3990732507,3148015412&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            link: ''
        },
        {
            _id: '9308457234890573',
            imgUrl: 'https://img0.baidu.com/it/u=3935415430,40868550&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=440',
            link: ''
        }
    ]
}

setupMock({
    setup(){
        Mock.mock(new RegExp('/api/v1/about'),(params)=>{
            switch (params.type) {
                case 'GET':

                    return {
                        code: 0,
                        data,
                        msg: '关于信息获取成功'
                    }
                case 'POST':
                    const postBody = JSON.parse(params.body)

                    return {
                        code: 0,
                        data: postBody,
                        msg: '关于信息添加成功'
                    }
                case 'PUT':
                    const body = JSON.parse(params.body)

                    return {
                        code: 0,
                        data: body,
                        msg: '关于信息修改成功'
                    }
            }
        })
    }
})
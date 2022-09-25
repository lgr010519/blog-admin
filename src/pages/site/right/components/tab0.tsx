import React, {useEffect, useState} from "react";
import {Form, Grid, Input, Message, Radio, Select, Switch} from "@arco-design/web-react";
import UploadImage from "@/components/UploadImage";
import Save from "@/components/Save";
import {addIntroduction, queryIntroduction, updateIntroduction} from "@/api/site/right";
import {getList} from "@/api/tags";
import {showPositions} from "@/constant";

const Tab0 = () => {
    const [form] = Form.useForm()
    const [time, setTime] = useState()
    const [tagsArr, setTagsArr] = useState([])

    const loadData = async (isRefresh?: boolean) => {
        const result: any = await queryIntroduction()
        if (isRefresh) {
            Message.success('刷新成功')
        }
        console.log('result', result)
        const data = result.data
        form.setFieldsValue(data)
        setTime(data.updateTime)
    }

    const onRefresh = () => {
        loadData(true)
    }

    const onSave = async () => {
        await form.validate()
        const values = await form.getFields()
        console.log(values)
        const postData = values
        postData.friendLink = postData.friendLink.map(item => {
            return {
                icon: item.icon,
                link: item.link,
                // _id: item._id
            }
        })
        const func = values._id ? updateIntroduction : addIntroduction
        const result: any = await func(postData)
        console.log('post', result)
        if (result.data) {
            loadData()
            Message.success(result.msg)
        } else {
            Message.error('修改失败，请重试')
        }
    }

    const getTags = async () => {
        const result: any = await getList({
            page: 1,
            pageSize: 9999
        })
        setTagsArr(result.data.list?.map(item => item.name) || [])
    }

    useEffect(() => {
        loadData()
        getTags()
    }, [])

    return (
        <>
            <Form form={form} layout="horizontal">
                <Grid.Row>
                    <Grid.Col span={10}>
                        <Form.Item label="昵称" layout="vertical" field="nickName"
                                   rules={[{required: true, message: '请输入昵称'},
                                       {minLength: 2, message: '至少2个字符'},
                                       {maxLength: 20, message: '最多20个字符'}]}>
                            <Input placeholder="请输入昵称"/>
                        </Form.Item>
                        <Form.Item label="简介" layout="vertical" field="desc"
                                   rules={[{required: true, message: '请输入简介'}]}>
                            <Input placeholder="请输入简介"/>
                        </Form.Item>
                        <Form.Item label="标签" layout="vertical" field="tags"
                                   rules={[{required: true, message: '请选择标签'}]}>
                            <Select mode="multiple" placeholder="请选择标签">
                                {tagsArr.map((option) => (
                                    <Select.Option key={option} value={option}>
                                        {option}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="展示位置" layout="vertical" field="showPosition"
                                   rules={[{required: true, message: '请选择展示位置'}]}>
                            <Select mode="multiple" placeholder="请选择展示位置">
                                {showPositions.map((option) => (
                                    <Select.Option key={option} value={option}>
                                        {option}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Grid.Col>
                    <Grid.Col span={12} offset={2}>
                        <Form.Item label="友情链接(1-4个)" layout="vertical" field="friendLink"
                                   rules={[{required: true, message: '请添加友情链接'}]}>
                            <UploadImage max={4} showImg={false} showIcon/>
                        </Form.Item>
                    </Grid.Col>
                </Grid.Row>
            </Form>
            <Save time={time} onRefresh={onRefresh} onSave={onSave}/>
        </>
    )
}

export default Tab0
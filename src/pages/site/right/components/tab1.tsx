import React, {useEffect, useState} from "react";
import {Form, Grid, Input, Message, Radio, Select, Switch} from "@arco-design/web-react";
import UploadImage from "@/components/UploadImage";
import Save from "@/components/Save";
import {addAd, queryAd, updateAd} from "@/api/site/right";
import {getList} from "@/api/tags";
import {showPositions} from "@/constant";

const Tab1 = () => {
    const [form] = Form.useForm()
    const [time, setTime] = useState()

    const loadData = async (isRefresh?: boolean) => {
        const result: any = await queryAd()
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
        postData.imgs = postData.imgs.map(item => {
            return {
                imgUrl: item.imgUrl,
                link: item.link,
                // _id: item._id
            }
        })
        const func = values._id ? updateAd : addAd
        const result: any = await func(postData)
        console.log('post', result)
        if (result.data) {
            loadData()
            Message.success(result.msg)
        } else {
            Message.error('修改失败，请重试')
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <Form form={form} layout="horizontal">
                <Grid.Row>
                    <Grid.Col span={12}>
                        <Form.Item label="广告图片(1-3张)" layout="vertical" field="imgs"
                                   rules={[{required: true, message: '请添加广告图片'}]}>
                            <UploadImage max={3}/>
                        </Form.Item>
                    </Grid.Col>
                    <Grid.Col span={12}>
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
                </Grid.Row>
            </Form>
            <Save time={time} onRefresh={onRefresh} onSave={onSave}/>
        </>
    )
}

export default Tab1
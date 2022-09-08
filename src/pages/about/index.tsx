import React, {useEffect, useState} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, Message, Switch} from "@arco-design/web-react";
import BlogTags from './components/tags'
import Save from "@/components/Save";
import UploadImage from '@/components/UploadImage'
import {addAbout, queryAbout, updateAbout} from "@/api/about";

const About = () => {
    const [form] = Form.useForm()
    const [time, setTime] = useState()

    const onRefresh = () => {
        loadData(true)
    }

    const onSave = async () => {
        await form.validate()
        const values = await form.getFields()
        console.log(values)
        values.imgs = values.imgs?.map(item => {
            return {
                _id: item._id,
                imgUrl: item.imgUrl,
                link: item.link
            }
        })
        const func = values._id ? updateAbout : addAbout
        const result:any = await func(values)
        if (result.data){
            loadData()
            Message.success(result.msg)
        }else {
            Message.error('修改失败，请重试')
        }
    }

    const loadData = async (isRefresh?:boolean) => {
        const result:any = await queryAbout()
        if (isRefresh){
            Message.success('刷新成功')
        }
        console.log('result',result)
        const data = result.data
        if (!data) return
        form.setFieldsValue(data)
        setTime(data.updateTime)
    }

    useEffect(() => {
        loadData()
    },[])

    return (
        <>
            <div className={styles.container}>
                <Card hoverable>
                    <Form form={form} layout="vertical">
                        <Grid.Row className='grid-demo' style={{ marginBottom: 16 }}>
                            <Grid.Col span={10}>
                                <Form.Item label="标签云：(1-20个)" field="tags" rules={[{ required: true, message: '请添加标签' }]}>
                                    <BlogTags max={20}/>
                                </Form.Item>
                                <Form.Item
                                    label="详细介绍"
                                    field="desc"
                                    rules={[{ required: true, message: '请输入详细介绍' },
                                        { maxLength: 800, message: '不能超过800个字符' }
                                    ]}
                                >
                                    <Input.TextArea rows={5} maxLength={800} showWordLimit/>
                                </Form.Item>
                                <Form.Item label="个人简历" layout="inline" field="showResume" triggerPropName="checked">
                                    <Switch checkedText="显示" uncheckedText="隐藏"/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={12} offset={2}>
                                <Form.Item label="介绍图片：(1-3张)" field="imgs" rules={[{ required: true, message: '请添加介绍图片' }]}>
                                    <UploadImage max={3} showIcon/>
                                </Form.Item>
                            </Grid.Col>
                        </Grid.Row>
                    </Form>
                </Card>
            </div>
            <Save time={time} onRefresh={onRefresh} onSave={onSave}/>
        </>
    )
}

export default About
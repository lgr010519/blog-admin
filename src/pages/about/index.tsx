import React, {useEffect} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, Switch} from "@arco-design/web-react";
import BlogTags from './components/tags'
import Save from "@/components/Save";
import UploadImage from '@/components/UploadImage'
import {queryAbout} from "@/api/about";

const About = () => {
    const [form] = Form.useForm()

    const onRefresh = () => {
        console.log(123)
    }

    const onSave = async () => {
        await form.validate()
        const values = await form.getFields()
        console.log(values)
    }

    const loadData = async () => {
        const result:any = await queryAbout()
        console.log('result',result)
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
            <Save time="2022-09-06" onRefresh={onRefresh} onSave={onSave}/>
        </>
    )
}

export default About
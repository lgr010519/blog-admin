import React, {useEffect, useState} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, Message, Switch} from "@arco-design/web-react";
import Save from "@/components/Save";
import UploadImage from '@/components/UploadImage'
import {addHome, queryHome, updateHome} from "@/api/site/home";

const Home = () => {
    const [form] = Form.useForm()
    const [time, setTime] = useState()

    const onRefresh = () => {
        loadData(true)
    }

    const onSave = async () => {
        await form.validate()
        const values = await form.getFields()
        const postData = {
            ...values,
            archiveBgImg: values.archiveBgImg[0].imgUrl,
            categoriesBgImg: values.categoriesBgImg[0].imgUrl,
            categoriesDetailBgImg: values.categoriesDetailBgImg[0].imgUrl,
            tagsBgImg: values.tagsBgImg[0].imgUrl,
            tagsDetailBgImg: values.tagsDetailBgImg[0].imgUrl,
            aboutBgImg: values.aboutBgImg[0].imgUrl,
        }
        const func = values._id ? updateHome : addHome
        const result:any = await func(postData)
        if (result.data){
            loadData()
            Message.success(result.msg)
        }else {
            Message.error('修改失败，请重试')
        }
    }

    const loadData = async (isRefresh?:boolean) => {
        const result:any = await queryHome()
        if (isRefresh){
            Message.success('刷新成功')
        }
        const data = result.data
        if (!data) return
        form.setFieldsValue({
            ...data,
            archiveBgImg: [{
                imgUrl: data.archiveBgImg
            }],
            categoriesBgImg: [{
                imgUrl: data.categoriesBgImg
            }],
            categoriesDetailBgImg: [{
                imgUrl: data.categoriesDetailBgImg
            }],
            tagsBgImg: [{
                imgUrl: data.tagsBgImg
            }],
            tagsDetailBgImg: [{
                imgUrl: data.tagsDetailBgImg
            }],
            aboutBgImg: [{
                imgUrl: data.aboutBgImg
            }]
        })
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
                        <Grid.Row>
                            <Grid.Col span={4}>
                                <Form.Item label="归档背景图片" field="archiveBgImg" rules={[{ required: true, message: '请添加归档背景图片' }]}>
                                    <UploadImage showLink={false} showAction={false}/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Form.Item label="分类背景图片" field="categoriesBgImg" rules={[{ required: true, message: '请添加分类背景图片' }]}>
                                    <UploadImage showLink={false} showAction={false}/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Form.Item label="分类详情背景图片" field="categoriesDetailBgImg" rules={[{ required: true, message: '请添加分类详情背景图片' }]}>
                                    <UploadImage showLink={false} showAction={false}/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Form.Item label="标签背景图片" field="tagsBgImg" rules={[{ required: true, message: '请添加标签背景图片' }]}>
                                    <UploadImage showLink={false} showAction={false}/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Form.Item label="标签详情背景图片" field="tagsDetailBgImg" rules={[{ required: true, message: '请添加标签详情背景图片' }]}>
                                    <UploadImage showLink={false} showAction={false}/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Form.Item label="关于背景图片" field="aboutBgImg" rules={[{ required: true, message: '请添加关于背景图片' }]}>
                                    <UploadImage showLink={false} showAction={false}/>
                                </Form.Item>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Col span={12}>
                                <Form.Item
                                    label="简介"
                                    field="introduction"
                                    rules={[{ required: true, message: '请输入详细介绍' },
                                        { maxLength: 800, message: '不能超过800个字符' }
                                    ]}
                                >
                                    <Input.TextArea rows={5} maxLength={800} showWordLimit/>
                                </Form.Item>
                            </Grid.Col>
                        </Grid.Row>
                        <Form.Item label="简介特效" layout="inline" field="effects" triggerPropName="checked">
                            <Switch checkedText="开启" uncheckedText="关闭"/>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <Save time={time} onRefresh={onRefresh} onSave={onSave}/>
        </>
    )
}

export default Home
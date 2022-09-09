import React, {useEffect, useState} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, Message, Radio, Switch} from "@arco-design/web-react";
import Save from "@/components/Save";
import UploadImage from '@/components/UploadImage'
import {addHome, queryHome, updateHome} from "@/api/site/home";

const HeaderFooter = () => {
    const [form] = Form.useForm()
    const [time, setTime] = useState()
    const [type, setType] = useState(0)

    const onRefresh = () => {
        loadData(true)
    }

    const onSave = async () => {
        await form.validate()
        const values = await form.getFields()
        console.log(values)
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
        const result: any = await func(postData)
        if (result.data) {
            loadData()
            Message.success(result.msg)
        } else {
            Message.error('修改失败，请重试')
        }
    }

    const loadData = async (isRefresh?: boolean) => {
        const result: any = await queryHome()
        if (isRefresh) {
            Message.success('刷新成功')
        }
        console.log('result', result)
        const data = result.data
        if (!data) return
        if (data.logo){
            form.setFieldsValue({
                ...data,
                logo: [{
                    imgUrl: data.logo
                }],
            })
        }
        setTime(data.updateTime)
    }

    const onRadioChange = (value) => {
        setType(value)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Form form={form} layout="vertical">
                    <Card hoverable title="Header配置">
                        <Grid.Row>
                            <Grid.Col span={10}>
                                <Form.Item label="是否开启搜索" layout="inline" field="header.openSearch"
                                           triggerPropName="checked" rules={[{required: true, message: '请选择是否开启搜索'}]}>
                                    <Switch checkedText="开启" uncheckedText="关闭"/>
                                </Form.Item>
                                <Form.Item label="是否开启登录" layout="inline" field="header.login"
                                           triggerPropName="checked" rules={[{required: true, message: '请选择是否开启登录'}]}>
                                    <Switch checkedText="开启" uncheckedText="关闭"/>
                                </Form.Item>
                                <Form.Item label="是否开启注册" layout="inline" field="header.register"
                                           triggerPropName="checked" rules={[{required: true, message: '请选择是否开启注册'}]}>
                                    <Switch checkedText="开启" uncheckedText="关闭"/>
                                </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={12} offset={2}>
                                <Form.Item label="Logo" layout="inline" field="header.type"
                                           triggerPropName="checked" rules={[{required: true, message: '请选择Logo'}]}>
                                    <Radio.Group onChange={onRadioChange}>
                                        <Radio value='1'>图片</Radio>
                                        <Radio value='2'>文本</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {
                                    type === 1 &&
                                    <Form.Item label="选择图片" field="header.logo"
                                               rules={[{required: true, message: '请添加Logo图片'}]}>
                                        <UploadImage showLink={false} showAction={false}/>
                                    </Form.Item>
                                }
                                {
                                    type === 2 &&
                                    <Form.Item
                                        label="文本"
                                        field="header.title"
                                        rules={[{required: true, message: '请输入文本'},
                                            {maxLength: 20, message: '不能超过20个字符'}
                                        ]}
                                    >
                                        <Input placeholder="请输入文本" maxLength={20} showWordLimit/>
                                    </Form.Item>
                                }
                            </Grid.Col>
                        </Grid.Row>
                    </Card>
                    <Card style={{marginTop: 20}} hoverable title="Footer配置">
                        <Form.Item
                            labelCol={{ span: 3 }}
                            layout="horizontal"
                            label="Copyright"
                            field="footer.copyright"
                            rules={[{required: true, message: '请输入Copyright'}
                            ]}
                        >
                            <Input placeholder="请输入Copyright"/>
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 3 }}
                            layout="horizontal"
                            label="额外信息"
                            labelAlign="right"
                            field="footer.extra"
                        >
                            <Input placeholder="请输入额外信息"/>
                        </Form.Item>
                    </Card>
                </Form>
            </div>
            <Save time={time} onRefresh={onRefresh} onSave={onSave}/>
        </>
    )
}

export default HeaderFooter
import React, {useEffect, useState} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, Message, Radio, Switch} from "@arco-design/web-react";
import Save from "@/components/Save";
import UploadImage from '@/components/UploadImage'
import {addHeaderFooter, queryHeaderFooter, updateHeaderFooter} from "@/api/site/headerFooter";

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
        const postData = values
        if (type === 1) {
            postData.header.logo = postData.header.logo[0].imgUrl
        }
        const func = values._id ? updateHeaderFooter : addHeaderFooter
        const result: any = await func(postData)
        if (result.data) {
            loadData()
            Message.success(result.msg)
        } else {
            Message.error('修改失败，请重试')
        }
    }

    const loadData = async (isRefresh?: boolean) => {
        const result: any = await queryHeaderFooter()
        if (isRefresh) {
            Message.success('刷新成功')
        }
        const data = result.data
        if (!data) {
            form.setFieldsValue({
                header: {
                    openSearch: false,
                    login: false,
                    register: false
                }
            })
            return
        }
        if (data.header.logo) {
            setType(1)
            form.setFieldsValue({
                type: 1,
                ...data,
                logo: [{
                    imgUrl: data.header.logo
                }],
            })
        } else {
            setType(2)
            form.setFieldsValue({
                ...data,
                type: 2
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
                                <Form.Item label="Logo" layout="inline" field="type"
                                           rules={[{required: true, message: '请选择Logo'}]}>
                                    <Radio.Group onChange={onRadioChange}>
                                        <Radio value={1}>图片</Radio>
                                        <Radio value={2}>文本</Radio>
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
                            labelCol={{span: 3}}
                            layout="horizontal"
                            label="Copyright"
                            field="footer.copyright"
                            rules={[{required: true, message: '请输入Copyright'}
                            ]}
                        >
                            <Input placeholder="请输入Copyright"/>
                        </Form.Item>
                        <Form.Item
                            labelCol={{span: 3}}
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
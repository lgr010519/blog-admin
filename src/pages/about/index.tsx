import React, {useEffect} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, Switch} from "@arco-design/web-react";
import BlogTags from './components/tags'

const About = () => {
    const [form] = Form.useForm()

    const submit = async () => {
        await form.validate()
        const values = await form.getFields()
        console.log(values)
    }

    useEffect(() => {
        setTimeout(()=>{
            form.setFieldsValue({
                tags: ['vue','react','nodejs','eggjs'],
                desc: '',
                showResume: false,
            })
        },1000)
    },[])

    return (
        <div className={styles.container}>
            <Card hoverable>
                <Form form={form} layout="vertical">
                    <Grid.Row className='grid-demo' style={{ marginBottom: 16 }}>
                        <Grid.Col span={12}>
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
                        <Grid.Col span={12}>
                            <Button onClick={submit}>获取值</Button>
                        </Grid.Col>
                    </Grid.Row>
                </Form>
            </Card>
        </div>
    )
}

export default About
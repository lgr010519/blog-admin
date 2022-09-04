import React from "react";
import styles from './style/index.module.less'
import {Card, Form} from "@arco-design/web-react";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

const About = () => {
    const [form] = Form.useForm()

    return (
        <div className={styles.container}>
            <Card hoverable>
                <Form form={form} {...formItemLayout}>
                    <Form.Item label="标签云：">

                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default About
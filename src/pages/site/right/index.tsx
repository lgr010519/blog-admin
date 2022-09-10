import React from "react";
import styles from './style/index.module.less'
import {Card, Tabs} from "@arco-design/web-react";
import Tab0 from "@/pages/site/right/components/tab0";
import Tab1 from "@/pages/site/right/components/tab1";
import Tab2 from "@/pages/site/right/components/tab2";

const HeaderFooter = () => {

    return (
        <>
            <div className={styles.container}>
                <Card hoverable>
                    <Tabs defaultActiveTab='0'>
                        <Tabs.TabPane key='0' title='个人简介'>
                            <Tab0/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key='1' title='广告设置'>
                            <Tab1/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key='2' title='推荐设置'>
                            <Tab2/>
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
                {/*<Card style={{marginTop: 20}} hoverable title="Footer配置">
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
                    </Card>*/}
            </div>
        </>
    )
}

export default HeaderFooter
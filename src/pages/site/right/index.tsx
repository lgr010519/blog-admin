import React, {useState} from "react";
import styles from './style/index.module.less'
import {Card, Tabs} from "@arco-design/web-react";
import Tab0 from "@/pages/site/right/components/tab0";
import Tab1 from "@/pages/site/right/components/tab1";
import Tab2 from "@/pages/site/right/components/tab2";

const HeaderFooter = () => {
    const [key, setKey] = useState('0')
    const onTabChange = (key) => {
        setKey(key)
    }

    return (
        <>
            <div className={styles.container}>
                <Card hoverable>
                    <Tabs activeTab={key} onChange={onTabChange}>
                        <Tabs.TabPane title="个人简介" key="0">
                            {
                                key == '0' && <Tab0/>
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane title="广告设置" key="1">
                            {
                                key == '1' && <Tab1/>
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane title="推荐设置" key="2">
                            {
                                key == '2' && <Tab2/>
                            }
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}

export default HeaderFooter
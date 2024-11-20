import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';
import { Card, Form, Grid, Input, Message } from '@arco-design/web-react';
import BlogTags from './components/tags';
import Save from '@/components/Save';
import UploadImage from '@/components/UploadImage';
import { addAbout, queryAbout, updateAbout } from '@/api/about';

const About = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState(null);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    await form.validate();
    const values = await form.getFields();
    values.imgs = values.imgs?.map((item) => {
      return {
        imgUrl: item.imgUrl,
        link: item.link,
      };
    });
    const func = values.id ? updateAbout : addAbout;
    const result: any = await func(values);
    if (result.data) {
      loadData();
      setTime(result.data.updateTime);
      Message.success(result.msg);
    } else {
      Message.error('修改失败，请重试');
    }
  };

  const loadData = async (isRefresh?: boolean) => {
    const result: any = await queryAbout();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = result.data;
    if (!data) return;
    form.setFieldsValue(data);
    setTime(data.updateTime);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Card hoverable>
          <Form form={form} layout="vertical">
            <Grid.Row className="grid-demo">
              <Grid.Col span={10}>
                <Form.Item
                  label="标签云：(1-20个)"
                  field="tags"
                  rules={[{ required: true, message: '请添加标签' }]}
                >
                  <BlogTags max={20} />
                </Form.Item>
                <Form.Item
                  label="详细介绍"
                  field="description"
                  rules={[
                    { required: true, message: '请输入详细介绍' },
                    { maxLength: 800, message: '不能超过800个字符' },
                  ]}
                >
                  <Input.TextArea rows={5} maxLength={800} showWordLimit />
                </Form.Item>
              </Grid.Col>
              <Grid.Col span={12} offset={2}>
                <Form.Item
                  label="介绍图片：(1-3张)"
                  field="imgs"
                  rules={[{ required: true, message: '请添加介绍图片' }]}
                >
                  <UploadImage max={3} showIcon />
                </Form.Item>
              </Grid.Col>
            </Grid.Row>
          </Form>
        </Card>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default About;

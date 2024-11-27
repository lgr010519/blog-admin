import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';
import { Card, Form, Grid, Input, Message } from '@arco-design/web-react';
import BlogTags from './components/tags';
import Save from '@/components/Save';
import { queryAbout, saveOrUpdate } from '@/api/about';
import UploadImage from '@/components/UploadImage';

export default function About() {
  const [form] = Form.useForm();
  const [time, setTime] = useState(null);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    await form.validate();
    const formData = form.getFields();
    const fields = {
      id: formData.id,
      description: formData.description,
      aboutImgList: formData.aboutImgList.map(
        (item: { imgUrl: string }) => item.imgUrl
      ),
      tagCloudList: formData.tagCloudList,
    };
    try {
      await saveOrUpdate(fields);
      loadData();
      Message.success('保存成功');
    } catch (error) {
      console.log(error);
    }
    // const func = values.id ? updateAbout : addAbout;
    // const result: any = await func(values);
    // if (result.data) {
    //   loadData();
    //   setTime(result.data.updateTime);
    //   Message.success(result.msg);
    // }
  };

  const loadData = async (isRefresh?: boolean) => {
    try {
      const res: any = await queryAbout();
      if (isRefresh) {
        Message.success('刷新成功');
      }
      const aboutDetail = res.data[0];
      aboutDetail.tagCloudList = aboutDetail.tagCloudList.map(
        (item) => item.name
      );
      form.setFieldsValue(aboutDetail);
      setTime(aboutDetail.updateTime);
    } catch (error) {
      console.log(error);
    }
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
                  field="tagCloudList"
                  rules={[{ required: true, message: '请添加标签' }]}
                >
                  <BlogTags max={20} />
                </Form.Item>
                <Form.Item
                  label="详细介绍"
                  field="description"
                  rules={[
                    { required: true, message: '请输入详细介绍' },
                    { maxLength: 800, message: '不能超过1000个字符' },
                  ]}
                >
                  <Input.TextArea rows={5} maxLength={1000} showWordLimit />
                </Form.Item>
              </Grid.Col>
              <Grid.Col span={12} offset={2}>
                <Form.Item
                  label="介绍图片：(1-3张)"
                  field="aboutImgList"
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
}

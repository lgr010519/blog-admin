import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';
import { Card, Form, Grid, Input, Message, Spin } from '@arco-design/web-react';
import Save from '@/components/Save';
import UploadImage from '@/components/UploadImage';
import { getData, saveOrUpdate } from '@/api/site/home';

const Home = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    await form.validate();
    const values = form.getFields();
    const postData = {
      ...values,
      archiveBgUrl: values.archiveBgUrl[0].imgUrl,
      categoriesBgUrl: values.categoriesBgUrl[0].imgUrl,
      categoriesDetailBgUrl: values.categoriesDetailBgUrl[0].imgUrl,
      tagsBgUrl: values.tagsBgUrl[0].imgUrl,
      tagsDetailBgUrl: values.tagsDetailBgUrl[0].imgUrl,
      // aboutBgUrl: values.aboutBgImg[0].imgUrl,
    };
    try {
      await saveOrUpdate(postData);
      loadData();
      Message.success('保存成功');
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async (isRefresh?: boolean) => {
    setLoading(true);
    try {
      const res: any = await getData();
      if (isRefresh) {
        Message.success('刷新成功');
      }
      const data = res.data;
      if (!data) return;
      form.setFieldsValue({
        ...data,
        archiveBgUrl: [
          {
            imgUrl: data.archiveBgUrl,
          },
        ],
        categoriesBgUrl: [
          {
            imgUrl: data.categoriesBgUrl,
          },
        ],
        categoriesDetailBgUrl: [
          {
            imgUrl: data.categoriesDetailBgUrl,
          },
        ],
        tagsBgUrl: [
          {
            imgUrl: data.tagsBgUrl,
          },
        ],
        tagsDetailBgUrl: [
          {
            imgUrl: data.tagsDetailBgUrl,
          },
        ],
        // aboutBgImg: [
        //   {
        //     imgUrl: data.aboutBgImg,
        //   },
        // ],
      });
      setTime(data.updateTime);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Card hoverable>
          <Spin loading={loading} style={{ display: 'block' }}>
            <Form form={form} layout="vertical">
              <Grid.Row>
                <Grid.Col span={5}>
                  <Form.Item
                    label="归档背景图片"
                    field="archiveBgUrl"
                    rules={[{ required: true, message: '请添加归档背景图片' }]}
                  >
                    <UploadImage showLink={false} showAction={false} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Form.Item
                    label="分类背景图片"
                    field="categoriesBgUrl"
                    rules={[{ required: true, message: '请添加分类背景图片' }]}
                  >
                    <UploadImage showLink={false} showAction={false} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Form.Item
                    label="分类详情背景图片"
                    field="categoriesDetailBgUrl"
                    rules={[
                      { required: true, message: '请添加分类详情背景图片' },
                    ]}
                  >
                    <UploadImage showLink={false} showAction={false} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Form.Item
                    label="标签背景图片"
                    field="tagsBgUrl"
                    rules={[{ required: true, message: '请添加标签背景图片' }]}
                  >
                    <UploadImage showLink={false} showAction={false} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Form.Item
                    label="标签详情背景图片"
                    field="tagsDetailBgUrl"
                    rules={[
                      { required: true, message: '请添加标签详情背景图片' },
                    ]}
                  >
                    <UploadImage showLink={false} showAction={false} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col span={12}>
                  <Form.Item
                    label="Intro"
                    field="introduction"
                    rules={[
                      { required: true, message: '请输入intro' },
                      { maxLength: 800, message: '不能超过1000个字符' },
                    ]}
                  >
                    <Input.TextArea rows={5} maxLength={1000} showWordLimit />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </Form>
          </Spin>
        </Card>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default Home;

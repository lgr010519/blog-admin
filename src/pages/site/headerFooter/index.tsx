import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';
import {
  Card,
  Form,
  Grid,
  Input,
  Message,
  Radio,
  Spin,
  Switch,
} from '@arco-design/web-react';
import Save from '@/components/Save';
import UploadImage from '@/components/UploadImage';
import { getData, saveOrUpdate } from '@/api/site/headerFooter';

const HeaderFooter = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState('');
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    await form.validate();
    const postData = form.getFields();
    postData.searchStatus = +postData.searchStatus;
    postData.loginStatus = +postData.loginStatus;
    postData.registerStatus = +postData.registerStatus;
    if (type === 1) {
      postData.logoImg = postData.logoImg[0].imgUrl;
    }
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
        searchStatus: Boolean(data.searchStatus),
        loginStatus: Boolean(data.loginStatus),
        registerStatus: Boolean(data.registerStatus),
      });
      if (data.logoType === 1) {
        setType(1);
        form.setFieldsValue({
          logoType: 1,
          logoImg: [
            {
              imgUrl: data.logoImg,
            },
          ],
        });
      } else if (data.logoType === 2) {
        setType(2);
        form.setFieldsValue({
          logoType: 2,
        });
      }
      setTime(data.updateTime);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRadioChange = (value: number) => {
    setType(value);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Spin loading={loading} style={{ display: 'block' }}>
          <Form form={form} layout="vertical">
            <Card hoverable title="Header配置">
              <Grid.Row>
                <Grid.Col span={10}>
                  <Form.Item
                    label="是否开启搜索"
                    layout="inline"
                    field="searchStatus"
                    triggerPropName="checked"
                    rules={[{ required: true, message: '请选择是否开启搜索' }]}
                  >
                    <Switch checkedText="开启" uncheckedText="关闭" />
                  </Form.Item>
                  <Form.Item
                    label="是否开启登录"
                    layout="inline"
                    field="loginStatus"
                    triggerPropName="checked"
                    rules={[{ required: true, message: '请选择是否开启登录' }]}
                  >
                    <Switch checkedText="开启" uncheckedText="关闭" />
                  </Form.Item>
                  <Form.Item
                    label="是否开启注册"
                    layout="inline"
                    field="registerStatus"
                    triggerPropName="checked"
                    rules={[{ required: true, message: '请选择是否开启注册' }]}
                  >
                    <Switch checkedText="开启" uncheckedText="关闭" />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12} offset={2}>
                  <Form.Item
                    label="Logo"
                    layout="inline"
                    field="logoType"
                    rules={[{ required: true, message: '请选择Logo' }]}
                  >
                    <Radio.Group onChange={onRadioChange}>
                      <Radio value={1}>图片</Radio>
                      <Radio value={2}>文本</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {type === 1 && (
                    <Form.Item
                      label="选择图片"
                      field="logoImg"
                      rules={[{ required: true, message: '请添加Logo图片' }]}
                    >
                      <UploadImage showLink={false} showAction={false} />
                    </Form.Item>
                  )}
                  {type === 2 && (
                    <Form.Item
                      label="文本"
                      field="logoText"
                      rules={[
                        { required: true, message: '请输入文本' },
                        { maxLength: 20, message: '不能超过20个字符' },
                      ]}
                    >
                      <Input
                        placeholder="请输入文本"
                        maxLength={20}
                        showWordLimit
                      />
                    </Form.Item>
                  )}
                </Grid.Col>
              </Grid.Row>
            </Card>
            <Card style={{ marginTop: 20 }} hoverable title="Footer配置">
              <Form.Item
                labelCol={{ span: 3 }}
                layout="horizontal"
                label="Copyright"
                field="copyright"
                rules={[{ required: true, message: '请输入Copyright' }]}
              >
                <Input placeholder="请输入Copyright" />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 3 }}
                layout="horizontal"
                label="额外信息"
                labelAlign="right"
                field="extra"
              >
                <Input placeholder="请输入额外信息" />
              </Form.Item>
            </Card>
          </Form>
        </Spin>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default HeaderFooter;

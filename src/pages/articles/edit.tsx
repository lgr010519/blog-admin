import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './style/index.module.less';
import {
  Card,
  Form,
  Grid,
  Input,
  InputNumber,
  Message,
  Select,
  Spin,
  Switch,
} from '@arco-design/web-react';
import Save from '@/components/Save';
import UploadImage from '@/components/UploadImage';
import { getDetail, saveOrUpdate } from '@/api/articles';
import { getList as getCategoryList } from '@/api/categories';
import { getList as getTagList } from '@/api/tags';
import MdEditor from 'for-editor';
import { useLocation } from 'react-router';
import { fileUpload } from '@/api/fileUpload';

const Edit = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 22,
    },
  };
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const formItemLayout2 = {
    labelCol: {
      span: 11,
    },
    wrapperCol: {
      span: 13,
    },
  };
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [tagsArr, setTagsArr] = useState([]);
  const editorRef = useRef<any>();
  const { search } = useLocation();

  const id = useMemo(() => {
    if (search) {
      return search.split('id=')[1];
    }
    return '';
  }, [search]);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async (publishStatus: number) => {
    await form.validate();
    const values = form.getFields();
    values.isComment = +values.isComment;
    values.isLike = +values.isLike;
    values.isCollect = +values.isCollect;
    values.cover = values.cover[0].imgUrl;
    values.publishStatus = publishStatus;
    values.status = 1;
    id && (values.id = +id);
    try {
      await saveOrUpdate(values);
      Message.success(publishStatus ? '发布成功' : '保存成功');
      location.href = '/articles';
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async (isRefresh?: boolean) => {
    if (!id) return;
    setLoading(true);
    try {
      const res: any = await getDetail({ id });
      const data = res.data;
      if (!data) return;
      data.cover = [
        {
          imgUrl: data.cover,
        },
      ];
      data.isComment = Boolean(data.isComment);
      data.isLike = Boolean(data.isLike);
      data.isCollect = Boolean(data.isCollect);
      data.tagIdList = data.tagsList.map((item: { id: number }) => item.id);
      delete data.tagsList;
      form.setFieldsValue(data);
      setTime(data.updateTime);
      if (isRefresh) {
        Message.success('刷新成功');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTags = async () => {
    const res: any = await getTagList({
      current: 1,
      size: -1,
      status: 1,
    });
    const tagList = res.data.records.map(
      (item: { id: number; name: string }) => ({
        key: item.id,
        value: item.name,
      })
    );
    setTagsArr(tagList);
  };

  const getCategories = async () => {
    const res: any = await getCategoryList({
      current: 1,
      size: -1,
    });
    const categoryList = res.data.records.map(
      (item: { id: number; name: string }) => ({
        key: item.id,
        value: item.name,
      })
    );
    setCategoriesArr(categoryList);
  };

  const addImg = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fileUpload(formData);
      editorRef.current.$img2Url(file.name, res[0].url);
    } catch (error) {
      console.log(error);
      Message.error('图片上传失败，请重试');
    }
  };

  useEffect(() => {
    getTags();
    getCategories();
    loadData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Spin loading={loading} style={{ display: 'block' }}>
          <Card hoverable>
            <Form
              {...layout}
              form={form}
              initialValues={{
                isCollect: true,
                isComment: true,
                isLike: true,
                views: 0,
                like: 0,
                collect: 0,
              }}
            >
              <Form.Item
                label="文章标题"
                field="title"
                rules={[{ required: true, message: '请输入文章标题' }]}
              >
                <Input placeholder="请输入文章标题" />
              </Form.Item>
              <Form.Item
                label="文章简介"
                field="introduction"
                rules={[
                  { required: true, message: '请输入文章简介' },
                  { minLength: 10, message: '至少10个字符' },
                  { maxLength: 500, message: '不能超过500个字符' },
                ]}
              >
                <Input.TextArea
                  rows={5}
                  minLength={10}
                  maxLength={500}
                  showWordLimit
                />
              </Form.Item>
              <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
                <Grid.Col span={12}>
                  <Form.Item
                    label="文章封面"
                    field="cover"
                    {...formItemLayout}
                    rules={[{ required: true, message: '请上传文章封面' }]}
                  >
                    <UploadImage showAction={false} showLink={false} />
                  </Form.Item>
                  <Form.Item
                    field="categoryId"
                    label="选择分类"
                    {...formItemLayout}
                    rules={[{ required: true, message: '请选择文章分类' }]}
                  >
                    <Select placeholder="请选择文章分类" defaultValue="">
                      {categoriesArr.map((item) => (
                        <Select.Option key={item.key} value={item.key}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    field="tagIdList"
                    label="选择标签"
                    {...formItemLayout}
                    rules={[{ required: true, message: '请选择文章标签' }]}
                  >
                    <Select placeholder="请选择文章标签" mode="multiple">
                      {tagsArr.map((item) => (
                        <Select.Option key={item.key} value={item.key}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Grid.Row>
                    <Grid.Col span={8}>
                      <Form.Item
                        label="评论"
                        layout="inline"
                        field="isComment"
                        triggerPropName="checked"
                      >
                        <Switch checkedText="显示" uncheckedText="隐藏" />
                      </Form.Item>
                      <Form.Item
                        label="点赞"
                        layout="inline"
                        field="isLike"
                        triggerPropName="checked"
                      >
                        <Switch checkedText="显示" uncheckedText="隐藏" />
                      </Form.Item>
                      <Form.Item
                        label="收藏"
                        layout="inline"
                        field="isCollect"
                        triggerPropName="checked"
                      >
                        <Switch checkedText="显示" uncheckedText="隐藏" />
                      </Form.Item>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Form.Item
                        label="查看数量"
                        field="views"
                        {...formItemLayout2}
                        rules={[{ required: true, message: '请输入查看数量' }]}
                      >
                        <InputNumber placeholder="请输入" />
                      </Form.Item>
                      <Form.Item
                        label="点赞数量"
                        field="like"
                        {...formItemLayout2}
                        rules={[{ required: true, message: '请输入点赞数量' }]}
                      >
                        <InputNumber placeholder="请输入" />
                      </Form.Item>
                      <Form.Item
                        label="收藏数量"
                        field="collect"
                        {...formItemLayout2}
                        rules={[{ required: true, message: '请输入收藏数量' }]}
                      >
                        <InputNumber placeholder="请输入" />
                      </Form.Item>
                    </Grid.Col>
                  </Grid.Row>
                </Grid.Col>
              </Grid.Row>
              <Form.Item
                wrapperCol={{ span: 24 }}
                field="content"
                rules={[{ required: true, message: '请撰写文章' }]}
              >
                <MdEditor
                  ref={(el) => (editorRef.current = el)}
                  addImg={(file) => addImg(file)}
                  placeholder="请撰写文章..."
                  height="400px"
                />
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </div>
      <Save
        time={time}
        showBack
        onRefresh={id && onRefresh}
        onSave={() => onSave(0)}
        onPublish={() => onSave(1)}
      />
    </>
  );
};

export default Edit;

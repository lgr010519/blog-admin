import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  DatePicker,
  Form,
  Grid,
  Input,
  Popconfirm,
  Radio,
  Select,
  Switch,
  Table,
  Tag,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { getList, remove, updateStatus } from '@/api/articles';
import { getList as getTagList } from '@/api/tags';
import { getList as getCategoryList } from '@/api/categories';
import { ReducerState } from '@/redux';
import { publishStatusOptions, statusOptions } from '@/constant';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';

const Articles = (props: { history: string[] }) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const columns: any = [
    {
      title: '文章标题',
      dataIndex: 'title',
      align: 'center',
      fixed: 'left',
      render: (title: string) => <span style={{ fontSize: 18 }}>{title}</span>,
    },
    {
      title: '封面',
      dataIndex: 'cover',
      align: 'center',
      render: (cover: string) => (
        <Avatar shape="square" size={64}>
          <img src={cover} alt="" />
        </Avatar>
      ),
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      align: 'center',
      width: 300,
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      align: 'center',
      width: 120,
    },
    {
      title: '标签',
      dataIndex: 'tagsList',
      align: 'center',
      render: (_, record) =>
        record.tagsList.map((item) => (
          <Tag style={{ marginRight: 10, marginBottom: 10 }} key={item.id}>
            {item.name}
          </Tag>
        )),
    },
    {
      title: '查看/评论/点赞/收藏',
      dataIndex: 'views',
      align: 'center',
      render: (_, record) => {
        return `${record.views} / ${record.comment} / ${record.like} / ${record.collect}`;
      },
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      align: 'center',
      render: (_, record) => (
        <Switch
          onChange={(checked) => onStatusChange(checked, record)}
          checkedText="启用"
          uncheckedText="停用"
          checkedIcon={<IconCheck />}
          uncheckedIcon={<IconClose />}
          checked={record.status === 1}
        />
      ),
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      align: 'center',
      render: (publishStatus: number) => {
        const text = {
          0: '未发布',
          1: '已发布',
        };
        const status = {
          0: 'error',
          1: 'success',
        };
        return (
          <Badge status={status[publishStatus]} text={text[publishStatus]} />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      render: (updateTime: string) => updateTime || '-',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div className={styles.operations}>
          <Button
            onClick={() => onPublishStatusChange(record)}
            type="text"
            size="small"
          >
            {record.publishStatus === 1 ? '下线' : '发布'}
          </Button>
          {record.publishStatus === 0 && (
            <>
              <Button onClick={() => onUpdate(record)} type="text" size="small">
                修改
              </Button>
              <Popconfirm title="确定删除吗?" onOk={() => onDelete(record.id)}>
                <Button type="text" status="danger" size="small">
                  删除
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  const articlesState = useSelector((state: ReducerState) => state.articles);
  const { data, pagination, loading, formParams } = articlesState;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [tagsArr, setTagsArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);

  const fetchData = async (current = 1, size = 6, params = {}) => {
    dispatch({
      type: UPDATE_LOADING,
      payload: {
        loading: true,
      },
    });
    try {
      const res: any = await getList({
        current,
        size,
        ...params,
      });
      res.data.records = res.data.records.filter((item: any) => item !== null);
      dispatch({
        type: UPDATE_LIST,
        payload: {
          data: res.data.records,
        },
      });
      dispatch({
        type: UPDATE_PAGINATION,
        payload: {
          pagination: {
            ...pagination,
            current,
            pageSize: size,
            total: res.data.total,
          },
        },
      });
      dispatch({
        type: UPDATE_FORM_PARAMS,
        payload: {
          params,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: UPDATE_LOADING,
        payload: {
          loading: false,
        },
      });
    }
  };

  const onStatusChange = async (checked: boolean, record: { id: number }) => {
    try {
      await updateStatus({
        id: record.id,
        status: checked ? 1 : 0,
      });
      fetchData(1, 6);
    } catch (error) {
      console.log(error);
    }
  };

  const onPublishStatusChange = async (record: {
    id: number;
    publishStatus: number;
  }) => {
    try {
      await updateStatus({
        id: record.id,
        publishStatus: record.publishStatus ? 0 : 1,
      });
      fetchData(1, 6);
    } catch (error) {
      console.log(error);
    }
  };

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  const onAdd = () => {
    props.history.push(`/articles/edit`);
  };

  const onUpdate = (row) => {
    props.history.push(`/articles/edit?id=${row.id}`);
  };

  const onDelete = async (id: number) => {
    try {
      await remove({ id });
      fetchData(1, 6);
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = async () => {
    const res: any = await getTagList({
      current: 1,
      size: 9999,
      status: 1,
    });
    const tagList = res.data.records.map((item) => ({
      key: item.id,
      value: item.name,
    }));
    setTagsArr(tagList);
  };

  const getCategories = async () => {
    const res: any = await getCategoryList({
      current: 1,
      size: 9999,
    });
    const categoryList = res.data.records.map((item) => ({
      key: item.id,
      value: item.name,
    }));
    setCategoriesArr(categoryList);
  };

  const onSearch = async () => {
    const formData = form.getFields();
    if (formData.categoryIds) {
      formData.categoryIds = formData.categoryIds.join(',');
    }
    if (formData.tagIds) {
      formData.tagIds = formData.tagIds.join(',');
    }
    // if (postData.createTime) {
    //   postData.createStartTime = dayjs(postData.createTime[0]).unix();
    //   postData.createEndTime = dayjs(postData.createTime[1]).unix();
    //   delete postData.createTime;
    // }
    // if (postData.updateTime) {
    //   postData.updateStartTime = dayjs(postData.updateTime[0]).unix();
    //   postData.updateEndTime = dayjs(postData.updateTime[1]).unix();
    //   delete postData.updateTime;
    // }
    fetchData(1, pagination.pageSize, formData);
  };

  const onReset = () => {
    form.resetFields();
    fetchData(1, 6);
  };

  const handleUpdateCollectStatus = async (isCollect: boolean) => {
    // const result: any = await updateCollectStatus({
    //   isCollect,
    // });
    // if (result.code === 200) {
    //   fetchData(1, 6, { status: 0 });
    //   Message.success(result.msg);
    // } else {
    //   Message.error('一键操作失败，请重试');
    // }
  };

  useEffect(() => {
    getTags();
    getCategories();
    fetchData(1, 6);
  }, []);

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary" onClick={onAdd}>
              添加文章
            </Button>
            <Radio.Group
              type="button"
              name="lang"
              style={{ marginLeft: 20 }}
              onChange={handleUpdateCollectStatus}
            >
              <Radio value={true}>一键开启收藏</Radio>
              <Radio value={false}>一键关闭收藏</Radio>
            </Radio.Group>
          </div>
        </div>
        <Form
          form={form}
          {...layout}
          style={{ marginBottom: 20 }}
          layout="horizontal"
          initialValues={{
            status: '',
            publishStatus: '',
          }}
        >
          <Grid.Row>
            <Grid.Col span={6}>
              <Form.Item field="title" label="文章标题">
                <Input placeholder="请输入文章标题" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="categoryIds" label="分类">
                <Select placeholder="请选择分类" mode="multiple">
                  {categoriesArr.map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="tagIds" label="标签">
                <Select placeholder="请选择标签" mode="multiple">
                  {tagsArr.map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="status" label="文章状态">
                <Select placeholder="请选择文章状态">
                  {[{ key: '', value: '全部' }, ...statusOptions].map(
                    (item) => (
                      <Select.Option key={item.key} value={item.key}>
                        {item.value}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={6}>
              <Form.Item field="publishStatus" label="发布状态">
                <Select placeholder="请选择发布状态" defaultValue="">
                  {[{ key: '', value: '全部' }, ...publishStatusOptions].map(
                    (item) => (
                      <Select.Option key={item.key} value={item.key}>
                        {item.value}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="createTime" label="创建时间">
                <DatePicker.RangePicker format="YYYY-MM-DD HH:mm:ss" showTime />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="updateTime" label="修改时间">
                <DatePicker.RangePicker format="YYYY-MM-DD HH:mm:ss" showTime />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={5} offset={1}>
              <Form.Item>
                <Button onClick={onReset}>重置</Button>
                <Button
                  onClick={onSearch}
                  type="primary"
                  style={{ marginLeft: 20 }}
                >
                  搜索
                </Button>
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          scroll={{
            x: 2000,
          }}
        />
      </Card>
    </div>
  );
};

export default Articles;

import React, { useEffect, useState } from 'react';
import useLocale from '@/utils/useLocale';
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { getList, remove, saveOrUpdate } from '@/api/categories';
import { ReducerState } from '@/redux';

export default function Categories() {
  const locale = useLocale();

  const columns: any = [
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
      editable: true,
      fixed: 'left',
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (_) => <span>{_ || '-'}</span>,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      render: (_) => <span>{_ || '-'}</span>,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button
            type="text"
            size="small"
            onClick={() => onAdd('update', record)}
          >
            修改
          </Button>
          <Popconfirm title="确定删除吗?" onOk={() => onDelete(record.id)}>
            <Button type="text" status="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const CategoriesState = useSelector(
    (state: ReducerState) => state.categories
  );
  const { data, pagination, loading, formParams, visible, confirmLoading } =
    CategoriesState;
  const dispatch = useDispatch();
  const [addOrUpdate, setAddOrUpdate] = useState('');
  const [categoryId, setCategoryId] = useState(null);

  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (current = 1, size = 10, params = {}) => {
    dispatch({
      type: UPDATE_LOADING,
      payload: { loading: true },
    });
    try {
      const res: any = await getList({
        current,
        size,
        ...params,
      });
      dispatch({
        type: UPDATE_LIST,
        payload: { data: res.data.records },
      });
      dispatch({
        type: UPDATE_PAGINATION,
        payload: {
          pagination: {
            ...pagination,
            current,
            size,
            total: res.data.total,
          },
        },
      });
      dispatch({
        type: UPDATE_FORM_PARAMS,
        payload: { params },
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: UPDATE_LOADING,
        payload: { loading: false },
      });
    }
  };

  const onChangeTable = (pagination) => {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  };

  const onSearch = (name) => {
    fetchData(1, pagination.pageSize, { name });
  };

  const onAdd = (flag, row) => {
    if (flag === 'add') {
      setAddOrUpdate('add');
    } else {
      setAddOrUpdate('update');
      setCategoryId(row.id);
      form.setFieldValue('name', row.name);
    }
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
  };

  const onCancel = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: false,
      },
    });
    form.resetFields();
  };

  const onOk = async () => {
    await form.validate();
    const data = form.getFields();
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: {
        confirmLoading: true,
      },
    });
    try {
      await saveOrUpdate({
        id: addOrUpdate === 'update' ? categoryId : undefined,
        ...data,
      });
      onCancel();
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: {
          confirmLoading: false,
        },
      });
    }
  };

  const onDelete = async (id) => {
    await remove({ id });
    fetchData();
  };

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary" onClick={() => onAdd('add', null)}>
              添加分类
            </Button>
          </div>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入分类名称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          scroll={{
            x: 1000,
            y: 400,
          }}
        />
        <Modal
          title={
            <div style={{ textAlign: 'left' }}>
              {addOrUpdate === 'add' ? '添加' : '修改'}分类
            </div>
          }
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            <Form.Item
              label="分类名称"
              field="name"
              rules={[{ required: true, message: '请输入分类名称' }]}
            >
              <Input placeholder="请输入分类名称" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

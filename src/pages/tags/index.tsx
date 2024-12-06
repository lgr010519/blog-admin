import React, { useEffect, useState } from 'react';
import useLocale from '@/utils/useLocale';
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Switch,
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
import { getList, remove, saveOrUpdate } from '@/api/tags';
import { ReducerState } from '@/redux';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';

export default function Tags() {
  const locale = useLocale();

  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  const columns: any = [
    {
      title: '标签名称',
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
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (_, record) => (
        <Switch
          onChange={(status) => onStatusChange(status, record)}
          checkedIcon={<IconCheck />}
          uncheckedIcon={<IconClose />}
          checkedText="启用"
          uncheckedText="停用"
          checked={record.status === 1}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (createTime: string) => createTime || '-',
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
      render: (_, record) => (
        <div className={styles.operations}>
          <Button
            disabled={record.status}
            onClick={() => onUpdate(record)}
            type="text"
            size="small"
          >
            修改
          </Button>
          <Popconfirm
            title="确定删除吗?"
            onOk={() => onDelete(record.id)}
            disabled={record.status}
          >
            <Button
              disabled={record.status}
              type="text"
              status="danger"
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tagsState = useSelector((state: ReducerState) => state.tags);
  const { data, pagination, loading, formParams, visible, confirmLoading } =
    tagsState;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [title, setTitle] = useState('添加标签');

  const fetchData = async (current = 1, size = 20, params = {}) => {
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

  const onChangeTable = (pagination: { current: number; pageSize: number }) => {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  };

  const onSearch = (name: string) => {
    fetchData(1, pagination.pageSize, { name });
  };

  const onAdd = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    setTitle('添加标签');
  };

  const onUpdate = (row: any) => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    setTitle('修改标签');
    form.setFieldsValue(row);
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
      await saveOrUpdate(data);
      onCancel();
      fetchData(pagination.current, pagination.pageSize, formParams);
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

  const onDelete = async (id: number) => {
    try {
      await remove({ id });
      fetchData(pagination.current, pagination.pageSize, formParams);
    } catch (error) {
      console.log(error);
    }
  };

  const onStatusChange = async (
    status: boolean,
    row: { id: number; status: number }
  ) => {
    try {
      await saveOrUpdate({
        id: row.id,
        status: row.status ? 0 : 1,
      });
      fetchData(pagination.current, pagination.pageSize, formParams);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary" onClick={onAdd}>
              添加标签
            </Button>
          </div>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入标签名称"
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
            y: 570,
          }}
        />
        <Modal
          title={<div style={{ textAlign: 'left' }}>{title}</div>}
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            <Form.Item
              label="标签名称"
              field="name"
              rules={[{ required: true, message: '请输入标签名称' }]}
            >
              <Input placeholder="请输入标签名称" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

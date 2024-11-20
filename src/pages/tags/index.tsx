import React, { useEffect, useState } from 'react';
import useLocale from '@/utils/useLocale';
import {
  Button,
  Card,
  Form,
  Input,
  Message,
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
import { create, getList, remove, update, updateStatus } from '@/api/tags';
import { ReducerState } from '@/redux';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';

function Tags() {
  const locale = useLocale();
  const [title, setTitle] = useState('添加标签');

  const columns: any = [
    {
      title: '标签名称',
      dataIndex: 'name',
      align: 'center',
      editable: true,
      fixed: 'left',
      render: (_, record) => <span style={{ fontSize: 18 }}>{_}</span>,
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
          checked={record.status === 0}
        />
      ),
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
            onOk={() => onDelete(record)}
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

  const categoriesState = useSelector(
    (state: ReducerState) => state.categories
  );
  const { data, pagination, loading, formParams, visible, confirmLoading } =
    categoriesState;
  const dispatch = useDispatch();

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

  async function fetchData(current = 1, pageSize = 10, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const result: any = await getList({
        pageNum: current,
        pageSize,
        ...params,
      });
      if (result.code === 0) {
        const handleResult = result;
        handleResult.data.records.forEach((item) => {
          item.createTime = dayjs(new Date(+item.createTime)).format(
            'YYYY-MM-DD HH:mm:ss'
          );
          if (+item.updateTime) {
            item.updateTime = dayjs(new Date(+item.updateTime)).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          } else {
            item.updateTime = '-';
          }
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({
          type: UPDATE_LIST,
          payload: { data: handleResult.data.records },
        });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: {
            pagination: {
              ...pagination,
              current,
              pageSize,
              total: handleResult.data.total,
            },
          },
        });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (e) {}
  }

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(name) {
    fetchData(1, pagination.pageSize, { name });
  }

  const onAdd = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    setTitle('添加标签');
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
    let func = create;
    if (data.id) {
      func = update;
    }
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: {
        confirmLoading: true,
      },
    });
    const result: any = await func(data);
    if (result.code === 0) {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: {
          confirmLoading: false,
        },
      });
      onCancel();
      fetchData();
    } else {
      Message.error(result.msg);
    }
  };
  const onUpdate = (row) => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    setTitle('修改标签');
    form.setFieldsValue(row);
  };
  const onDelete = async (row) => {
    const result: any = await remove(row);
    if (result.code === 0) {
      fetchData();
    } else {
      Message.error(result.msg);
    }
  };
  const onStatusChange = async (status: boolean, row) => {
    const result: any = await updateStatus({
      id: row.id,
      status: status ? 0 : 1,
    });
    if (result.code === 0) {
      fetchData();
    } else {
      Message.error(result.msg);
    }
  };

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
            y: 400,
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

export default Tags;

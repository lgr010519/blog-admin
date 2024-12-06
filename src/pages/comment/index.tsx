import React, { useEffect, useState } from 'react';
import useLocale from '@/utils/useLocale';
import {
  Badge,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Table,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { getList, remove, updateStatus } from '@/api/comment';
import { ReducerState } from '@/redux';
import { auditStatusOptions } from '@/constant';

function Categories() {
  const locale = useLocale();

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      fixed: 'left',
      width: 80,
    },
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      align: 'center',
      fixed: 'left',
      width: 180,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      align: 'center',
    },
    {
      title: '当前回复内容',
      dataIndex: 'currentReplayContent',
      align: 'center',
    },
    {
      title: '目标回复ID',
      dataIndex: 'targetReplayId',
      align: 'center',
      width: 110,
      render: (targetReplayId: number) => targetReplayId || '-',
    },
    {
      title: '目标回复内容',
      dataIndex: 'targetReplayContent',
      align: 'center',
      render: (targetReplayContent: number) => targetReplayContent || '-',
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      align: 'center',
      render: (auditStatus: string | number) => {
        const current = auditStatusOptions.filter(
          (item) => item.value === +auditStatus
        );
        const obj = current[0];
        const enums = {
          0: 'warning',
          1: 'success',
          2: 'error',
        };
        return <Badge status={enums[obj.value]} text={obj.label} />;
      },
    },
    {
      title: '评论时间',
      dataIndex: 'commentTime',
      align: 'center',
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      align: 'center',
      render: (auditTime: string) => auditTime || '-',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button
            onClick={() => handleAudit(record.id)}
            type="text"
            status="success"
            size="small"
          >
            审核
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

  const commentState = useSelector((state: ReducerState) => state.comment);
  const { data, pagination, loading, formParams } = commentState;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [query, setQuery] = useState({
    articleTitle: undefined,
    auditStatus: undefined,
  });
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState(null);

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

  function onSearch(articleTitle: string) {
    setQuery({
      ...query,
      articleTitle,
    });
    fetchData(1, pagination.pageSize, {
      ...query,
      articleTitle,
    });
  }

  const onDelete = async (commentId: number) => {
    try {
      await remove({ id: commentId });
      fetchData(pagination.current, pagination.pageSize, formParams);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectSearch = (auditStatus: number) => {
    setQuery({
      ...query,
      auditStatus,
    });
    fetchData(1, pagination.pageSize, {
      ...query,
      auditStatus,
    });
  };

  const handleAudit = (commentId: number) => {
    setVisible(true);
    setId(commentId);
  };

  const onOk = async () => {
    await form.validate();
    setConfirmLoading(true);
    const formData = {
      id,
      ...form.getFields(),
    };
    try {
      await updateStatus(formData);
      onCancel();
      fetchData(pagination.current, pagination.pageSize, formParams);
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
    setId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入文章标题"
              onSearch={onSearch}
            />
            <Select
              defaultValue={''}
              placeholder="请选择审核状态"
              style={{ width: 160, marginLeft: 20, marginRight: 20 }}
              onChange={onSelectSearch}
            >
              {auditStatusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => handleAudit(-1)}>
              一键审核
            </Button>
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          scroll={{ x: 1600 }}
        />
        <Modal
          title="审核"
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form form={form}>
            <Form.Item
              label="审核状态"
              field="auditStatus"
              rules={[{ required: true, message: '请选择审核状态' }]}
            >
              <Radio.Group>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default Categories;

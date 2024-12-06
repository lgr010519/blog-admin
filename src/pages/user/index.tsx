import React, { useEffect } from 'react';
import useLocale from '@/utils/useLocale';
import {
  Avatar,
  Button,
  Card,
  Input,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { getList, remove } from '@/api/user';
import { ReducerState } from '@/redux';

function Categories() {
  const locale = useLocale();

  const columns: any = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      align: 'center',
      width: 100,
      fixed: 'left',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      align: 'center',
      render: (avatar: string) => (
        <Avatar shape="square" size={64}>
          <img src={avatar} alt="" />
        </Avatar>
      ),
    },
    {
      title: '来源',
      dataIndex: 'provider',
      align: 'center',
      width: 110,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '收藏文章数量',
      dataIndex: 'articleNum',
      align: 'center',
      width: 120,
      render: (articleNum: number) => <Tag color="orange">{articleNum}</Tag>,
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      align: 'center',
      render: (introduction: string) => (
        <Tooltip content={introduction} position="tl">
          {introduction || '-'}
        </Tooltip>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className={styles.operations}>
          <Popconfirm title="确定删除吗?" onOk={() => onDelete(record.id)}>
            <Button type="text" status="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const userState = useSelector((state: ReducerState) => state.user);
  const { data, pagination, loading, formParams } = userState;
  const dispatch = useDispatch();

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

  const onSearch = (nickName: string) => {
    fetchData(1, pagination.pageSize, { nickName });
  };

  const onDelete = async (id: number) => {
    try {
      await remove({ id });
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
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入昵称"
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
        />
      </Card>
    </div>
  );
}

export default Categories;

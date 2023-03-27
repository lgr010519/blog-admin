import React, {useEffect, useState} from 'react';
import useLocale from "@/utils/useLocale";
import {
  Badge,
  Button,
  Card,
  Form,
  Image,
  Input,
  Message, Modal,
  Popconfirm, Radio, Select,
  Table, Tag, Tooltip
} from "@arco-design/web-react";
import styles from './style/index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION
} from './redux/actionTypes'
import {getList, remove, updateCommentStatus} from "@/api/comment";
import {ReducerState} from "@/redux";
import {auditStatusOptions} from "@/constant";
import dayjs from "dayjs";

function Categories() {
  const locale = useLocale()
  const [query, setQuery] = useState({
    articleTitle: '',
    auditStatus: 0
  })
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState('')

  const columns: any = [
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      align: 'center',
      fixed: 'left',
      width: 180,
      render: (_, record) => (
        <span style={{fontSize: 18}}>{_}</span>
      )
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
    },
    {
      title: '目标回复内容',
      dataIndex: 'targetReplayContent',
      align: 'center',
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      align: 'center',
      render: (text) => {
        const current = auditStatusOptions.filter(item => item.value === +text)
        const obj = current[0]
        const enums = {
          1: 'success',
          2: 'error',
          3: 'warning'
        }
        return (
          <Badge status={enums[obj.value]} text={obj.label}/>
        )
      }
    },
    {
      title: '评论时间',
      dataIndex: 'commentTime',
      align: 'center',
      render: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      align: 'center',
      render: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button onClick={() => handleAudit(record)} type="text" status="success" size="small">审核</Button>
          <Popconfirm
            title='确定删除吗?'
            onOk={() => onDelete(record)}
          >
            <Button type="text" status="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      )
    },
  ]

  const commentState = useSelector((state: ReducerState) => state.comment)
  const {data, pagination, loading, formParams} = commentState
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData(1, pagination.pageSize, query)
  }, [query])

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({type: UPDATE_LOADING, payload: {loading: true}})
    try {
      const result: any = await getList({
        page: current,
        pageSize,
        ...params,
      })
      if (result) {
        dispatch({type: UPDATE_LOADING, payload: {loading: false}})
        dispatch({type: UPDATE_LIST, payload: {data: result.data.list}})
        dispatch({
          type: UPDATE_PAGINATION,
          payload: {pagination: {...pagination, current, pageSize, total: result.data.totalCount}}
        })
        dispatch({type: UPDATE_FORM_PARAMS, payload: {params}})
      }
    } catch (e) {

    }
  }

  function onChangeTable(pagination) {
    const {current, pageSize} = pagination
    fetchData(current, pageSize, formParams)
  }

  function onSearch(articleTitle) {
    setQuery({
      ...query,
      articleTitle
    })
  }

  const onDelete = async (row) => {
    const result: any = await remove(row)
    if (result.code === 200) {
      fetchData()
      Message.success(result.msg)
    } else {
      Message.error('删除失败，请重试')
    }
  }

  const onSelectSearch = (auditStatus) => {
    setQuery({
      ...query,
      auditStatus
    })
  }

  const handleAudit = (row) => {
    setVisible(true)
    setId(row._id)
  }

  const onOk = async () => {
    await form.validate()
    setConfirmLoading(true)
    const values = await form.getFields()
    const postData = {
      id,
      ...values
    }
    const result: any = await updateCommentStatus(postData)
    if (result.code === 200) {
      Message.success(result.msg)
      fetchData()
      setConfirmLoading(false)
      onCancel()
    } else {
      Message.error('审核失败，请重试')
    }
  }

  const onCancel = () => {
    setVisible(false)
    form.resetFields()
    setId('')
  }

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search
              style={{width: 300}}
              searchButton
              placeholder="请输入文章标题"
              onSearch={onSearch}
            />
            <Select
              defaultValue={0}
              placeholder='请选择审核状态'
              style={{width: 160, marginLeft: 20, marginRight: 20}}
              onChange={onSelectSearch}
            >
              {auditStatusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => handleAudit({_id: 0})}>一键审核</Button>
          </div>
        </div>
        <Table
          rowKey={`_id${Math.floor(Math.random() * 10)}`}
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          scroll={{x: 1600}}
        />
        <Modal
          title='审核'
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form
            form={form}
          >
            <Form.Item label='审核状态' field='auditStatus' rules={[{required: true, message: '请选择审核状态'}]}>
              <Radio.Group>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  )
}

export default Categories

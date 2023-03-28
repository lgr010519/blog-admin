import React, {useEffect, useState} from 'react';
import useLocale from "@/utils/useLocale";
import {
  Avatar,
  Badge,
  Button,
  Card,
  DatePicker,
  Form,
  Grid,
  Input,
  Message,
  Popconfirm,
  Radio,
  Select,
  Switch,
  Table,
  Tag,
} from "@arco-design/web-react";
import styles from './style/index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION
} from './redux/actionTypes'
import {getList, remove, updateStatus, updatePublishStatus, updateCollectStatus} from "@/api/articles";
import {getList as getTagsList} from '@/api/tags'
import {getList as getCategoriesList} from '@/api/categories'
import {ReducerState} from "@/redux";
import {
  publishStatusOptions,
  statusOptions
} from "@/constant";
import dayjs from "dayjs";
import {IconCheck, IconClose} from "@arco-design/web-react/icon";

function Articles(props) {
  const onStatusChange = async (checked, record) => {
    const postData = {
      id: record._id,
      status: checked ? 1 : 2,
    }
    const result: any = await updateStatus(postData)
    if (result.code === 200) {
      Message.success(result.msg)
      fetchData(1, 6, {status: 0, publishStatus: 0})
    } else {
      Message.error('修改失败，请重试')
    }
  }

  const onChangePublishStatus = async (record) => {
    const postData = {
      id: record._id,
      publishStatus: record.publishStatus === 1 ? 2 : 1,
    }
    const result: any = await updatePublishStatus(postData)
    if (result.code === 200) {
      Message.success(result.msg)
      fetchData(1, 6, {status: 0, publishStatus: 0})
    } else {
      Message.error('修改失败，请重试')
    }
  }

  const columns: any = [
    {
      title: '文章标题',
      dataIndex: 'title',
      align: 'center',
      fixed: 'left',
      render: (_, record) => (
        <span style={{fontSize: 18}}>{_}</span>
      )
    },
    {
      title: '封面',
      dataIndex: 'cover',
      align: 'center',
      render: (_, record) => (
        <Avatar shape='square' size={64}>
          <img src={record.cover}/>
        </Avatar>
      )
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      align: 'center',
      width: 300,
    },
    {
      title: '分类',
      dataIndex: 'categories',
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      align: 'center',
      render: (_, record) => {
        const result = []
        for (let i = 0; i < record.tags.length; i += 3) {
          result.push(record.tags.slice(i, i + 3))
        }
        return result.map((item, index) => {
          return (
            <>
              {
                item.map(sub => <Tag style={{marginRight: 10, marginBottom: 10}} key={sub}>{sub}</Tag>)
              }
            </>
          )
        })
      }
    },
    {
      title: '查看/评论/点赞/收藏',
      dataIndex: 'views',
      align: 'center',
      render: (_, record) => {
        return `${record.views} / ${record.comment} / ${record.like} / ${record.collect}`
      }
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      align: 'center',
      render: (_, record) => (
        <Switch onChange={(checked) => onStatusChange(checked, record)} checkedText="启用" uncheckedText="停用"
                checkedIcon={<IconCheck/>} uncheckedIcon={<IconClose/>} checked={record.status === 1}/>
      )
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      align: 'center',
      render: (text, record) => {
        const texts = {
          1: '已发布',
          2: '未发布'
        }
        const enums = {
          1: 'success',
          2: 'error',
        }
        return (
          <Badge status={enums[record.publishStatus]} text={texts[record.publishStatus]}/>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (_, record) => (
        dayjs(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
      )
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      render: (_, record) => (
        record.updateTime ? dayjs(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
      )
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div className={styles.operations}>
          <Button onClick={() => onChangePublishStatus(record)} type="text" size="small">
            {record.publishStatus === 1 ? '下线' : '发布'}
          </Button>
          {
            record.publishStatus === 2 && (
              <>
                <Button onClick={() => onUpdate(record)} type="text" size="small">
                  修改
                </Button>
                <Popconfirm
                  title='确定删除吗?'
                  onOk={() => onDelete(record)}
                >
                  <Button type="text" status="danger" size="small">
                    删除
                  </Button>
                </Popconfirm>
              </>
            )
          }
        </div>
      )
    },
  ]

  const articlesState = useSelector((state: ReducerState) => state.articles)
  const {data, pagination, loading, formParams} = articlesState
  const dispatch = useDispatch()
  const [tagsArr, setTagsArr] = useState([])
  const [categoriesArr, setCategoriesArr] = useState([])

  const [form] = Form.useForm()

  useEffect(() => {
    getTags()
    getCategories()
    fetchData(1, 6, {status: 0, publishStatus: 0})
  }, [])

  async function fetchData(current = 1, pageSize = 6, params = {}) {
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

  const onSelectChange = (project) => {
    fetchData(1, pagination.pageSize, {project})
  }

  const onAdd = () => {
    props.history.push(`/articles/edit`)
  }
  const onUpdate = (row) => {
    props.history.push(`/articles/edit?id=${row._id}`)
  }
  const onDelete = async (row) => {
    const result: any = await remove({
      id: row._id
    })
    if (result.code === 200) {
      fetchData(1, 6, {status: 0, publishStatus: 0})
      Message.success(result.msg)
    } else {
      Message.error('删除失败，请重试')
    }
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    }
  }

  const getTags = async () => {
    const result: any = await getTagsList({
      page: 1,
      pageSize: 9999
    })
    const list = result.data.list?.map(item => {
      item.key = item._id
      item.value = item.name
      return item
    })
    setTagsArr(list)
  }

  const getCategories = async () => {
    const result: any = await getCategoriesList({
      page: 1,
      pageSize: 9999
    })
    const list = result.data.list?.map(item => {
      item.key = item._id
      item.value = item.name
      return item
    })
    setCategoriesArr(list)
  }

  const onSearch = async () => {
    const values = await form.getFields()
    const postData = values
    if (postData.tags) {
      postData.tags = postData.tags.join(',')
    }
    if (postData.categories) {
      postData.categories = postData.categories.join(',')
    }
    if (postData.createTime) {
      postData.createStartTime = dayjs(postData.createTime[0]).unix()
      postData.createEndTime = dayjs(postData.createTime[1]).unix()
      delete postData.createTime
    }
    if (postData.updateTime) {
      postData.updateStartTime = dayjs(postData.updateTime[0]).unix()
      postData.updateEndTime = dayjs(postData.updateTime[1]).unix()
      delete postData.updateTime
    }
    fetchData(1, pagination.pageSize, postData)
  }

  const onReset = () => {
    form.resetFields()
    fetchData(1, 6, {status: 0, publishStatus: 0})
  }

  const handleUpdateCollectStatus = async (isCollect) => {
    const result: any = await updateCollectStatus({
      isCollect
    })
    if (result.code === 200) {
      fetchData(1, 6, {status: 0, publishStatus: 0})
      Message.success(result.msg)
    } else {
      Message.error('一键操作失败，请重试')
    }
  }

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary" onClick={onAdd}>添加文章</Button>
            <Radio.Group
              type='button'
              name='lang'
              style={{marginLeft: 20}}
              onChange={handleUpdateCollectStatus}
            >
              <Radio value={true}>一键开启收藏</Radio>
              <Radio value={false}>一键关闭收藏</Radio>
            </Radio.Group>
          </div>
        </div>
        <Form form={form} {...layout} style={{marginBottom: 20}} layout="horizontal" initialValues={{
          categories: '',
          status: '0',
          publishStatus: '0',
        }}>
          <Grid.Row>
            <Grid.Col span={6}>
              <Form.Item field="title" label="文章标题">
                <Input placeholder="请输入文章标题"/>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="categories" label="分类">
                <Select placeholder="请选择分类"
                        mode="multiple">
                  {
                    categoriesArr.map(item => <Select.Option
                      key={item.key}
                      value={item.value}>{item.value}</Select.Option>)
                  }
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="tags" label="标签">
                <Select placeholder="请选择标签"
                        mode="multiple">
                  {
                    tagsArr.map(item => <Select.Option key={item.key}
                                                       value={item.value}>{item.value}</Select.Option>)
                  }
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="status" label="文章状态">
                <Select placeholder="请选择文章状态">
                  {
                    [{key: '0', value: '全部'}, ...statusOptions].map(item =>
                      <Select.Option key={item.key}
                                     value={item.key}>{item.value}</Select.Option>)
                  }
                </Select>
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={6}>
              <Form.Item field="publishStatus" label="发布状态">
                <Select placeholder="请选择发布状态"
                        defaultValue="">
                  {
                    [{key: '0', value: '全部'}, ...publishStatusOptions].map(item =>
                      <Select.Option key={item.key}
                                     value={item.key}>{item.value}</Select.Option>)
                  }
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="createTime" label="创建时间">
                <DatePicker.RangePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={6}>
              <Form.Item field="updateTime" label="修改时间">
                <DatePicker.RangePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={5} offset={1}>
              <Form.Item>
                <Button onClick={onReset}>重置</Button>
                <Button onClick={onSearch} type="primary" style={{marginLeft: 20}}>搜索</Button>
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form>
        <Table
          rowKey="_id"
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
  )
}

export default Articles

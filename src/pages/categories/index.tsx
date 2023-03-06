import React, {useEffect, useState} from 'react';
import useLocale from "@/utils/useLocale";
import {Button, Card, Form, Input, Message, Modal, Popconfirm, Table} from "@arco-design/web-react";
import styles from './style/index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION
} from './redux/actionTypes'
import {getList, create, update, remove} from "@/api/categories";
import {ReducerState} from "@/redux";
import dayjs from "dayjs";

function Categories() {
  const locale = useLocale()

  const columns: any = [
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
      editable: true,
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
      render: (_, record) => (
        <div className={styles.operations}>
          <Button type="text" size="small" onClick={() => onAdd('update',record)}>
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
        </div>
      )
    },
  ]

  const CategoriesState = useSelector((state: ReducerState) => state.categories)
  const {data, pagination, loading, formParams, visible, confirmLoading} = CategoriesState
  const dispatch = useDispatch()
  const [addOrUpdate, setAddOrUpdate] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  const [form] = Form.useForm()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({type: UPDATE_LOADING, payload: {loading: true}})
    try {
      const result: any = await getList({
        page: current,
        pageSize,
        ...params,
      })
      if (result.code === 200) {
        const handleResult = result
        handleResult.data.list.forEach(item => {
          item.createTime = dayjs(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          if (item.updateTime) {
            item.updateTime = dayjs(item.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          } else {
            item.updateTime = '-'
          }
        })
        dispatch({type: UPDATE_LOADING, payload: {loading: false}})
        dispatch({type: UPDATE_LIST, payload: {data: handleResult.data.list}})
        dispatch({
          type: UPDATE_PAGINATION,
          payload: {pagination: {...pagination, current, pageSize, total: handleResult.data.totalCount}}
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

  function onSearch(name) {
    fetchData(1, pagination.pageSize, {name})
  }

  const onAdd = (flag, row) => {
    if (flag === 'add') {
      setAddOrUpdate('add')
    } else if (flag === 'update') {
      setAddOrUpdate('update')
      setCategoryId(row._id)
      form.setFieldValue('name', row.name)
    }
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true
      }
    })
  }
  const onCancel = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: false
      }
    })
    form.resetFields()
  }
  const onOk = async () => {
    await form.validate()
    const data = form.getFields()
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: {
        confirmLoading: true
      }
    })
    if (addOrUpdate === 'add') {
      const result: any = await create(data)
      if (result.code === 200) {
        dispatch({
          type: TOGGLE_CONFIRM_LOADING,
          payload: {
            confirmLoading: false
          }
        })
        onCancel()
        fetchData().then(Message.success(result.msg))
      } else {
        dispatch({
          type: TOGGLE_CONFIRM_LOADING,
          payload: {
            confirmLoading: false
          }
        })
        Message.error('添加失败，请重试')
      }
    } else if (addOrUpdate === 'update') {
      const result: any = await update({...data, id: categoryId})
      if (result.code === 200) {
        dispatch({
          type: TOGGLE_CONFIRM_LOADING,
          payload: {
            confirmLoading: false
          }
        })
        onCancel()
        fetchData().then(Message.success(result.msg))
      } else {
        dispatch({
          type: TOGGLE_CONFIRM_LOADING,
          payload: {
            confirmLoading: false
          }
        })
        Message.error('修改失败，请重试')
      }
    }
  }

  const onDelete = async (row) => {
    const result: any = await remove(row)
    if (result.code === 200) {
      fetchData().then(Message.success(result.msg))
    } else {
      Message.error('删除失败，请重试')
    }
  }

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary" onClick={() => onAdd('add',null)}>添加分类</Button>
          </div>
          <div>
            <Input.Search
              style={{width: 300}}
              searchButton
              placeholder="请输入分类名称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          className={styles['table-demo-editable-cell']}
        />
        <Modal
          title={(
            <div style={{textAlign: 'left'}}>{addOrUpdate === 'add' ? '添加' : '修改'}分类</div>
          )}
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form
            {...formItemLayout}
            form={form}
          >
            <Form.Item label='分类名称' field='name' rules={[{required: true, message: '请输入分类名称'}]}>
              <Input placeholder='请输入分类名称'/>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  )
}

export default Categories

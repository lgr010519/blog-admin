import React, {useEffect} from 'react';
import useLocale from "@/utils/useLocale";
import {Breadcrumb, Button, Card, Form, Input, Message, Modal, Popconfirm, Select, Table} from "@arco-design/web-react";
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
import {getList,create,update,remove} from "@/api/categories";
import {ReducerState} from "@/redux";
import {EditableCell, EditableRow} from "@/pages/categories/edit";

function Categories() {
    const locale = useLocale()

    const columns:any = [
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
            render: (_,record)=>(
                <div className={styles.operations}>
                    <Button type="text" size="small">
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

    const categoriesState = useSelector((state: ReducerState)=> state.categories)
    const { data, pagination, loading, formParams, visible, confirmLoading } = categoriesState
    const dispatch = useDispatch()

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 19,
        },
    };

    const [form] = Form.useForm()

    useEffect(()=>{
        fetchData()
    },[])

    async function fetchData(current = 1, pageSize = 20, params = {}) {
        dispatch({type: UPDATE_LOADING, payload: {loading: true}})
        try {
            const result:any = await getList({
                page: current,
                pageSize,
                ...params,
            })
            console.log(result)
            if (result){
                dispatch({ type: UPDATE_LOADING, payload: { loading: false } })
                dispatch({ type: UPDATE_LIST, payload: { data: result.list } })
                dispatch({ type: UPDATE_PAGINATION, payload: { pagination: { ...pagination, current, pageSize, total: result.totalCount } } })
                dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } })
            }
        }catch (e) {

        }
    }

    function onChangeTable(pagination) {
        const { current, pageSize } = pagination
        fetchData(current, pageSize, formParams)
    }

    function onSearch(name) {
        fetchData(1, pagination.pageSize, { name })
    }

    const onAdd = () => {
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
        const result:any = await create(data)
        console.log('result',result)
        if (result.code === 0){
            dispatch({
                type: TOGGLE_CONFIRM_LOADING,
                payload: {
                    confirmLoading: false
                }
            })
            onCancel()
            fetchData().then(Message.success(result.msg))
        }else{
            Message.success('添加失败，请重试')
        }
    }
    const onHandleSave = async (row) => {
        const result:any = await update(row)
        if (result.code === 0){
            fetchData().then(Message.success(result.msg))
        }else{
            Message.error('修改失败，请重试')
        }
    }
    const onDelete = async (row) => {
        const result:any = await remove(row)
        if (result.code === 0){
            fetchData().then(Message.success(result.msg))
        }else{
            Message.error('删除失败，请重试')
        }
    }

    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                <Breadcrumb.Item>分类管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        <Button type="primary" onClick={onAdd}>添加分类</Button>
                    </div>
                    <div>
                        {/*<DatePicker.RangePicker style={{marginRight: 8}} onChange={onDateChange} />*/}
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
                    columns={columns.map((column) =>
                        column.editable
                            ? {
                                ...column,
                                onCell: () => ({
                                    onHandleSave,
                                }),
                            }
                            : column
                    )}
                    data={data}
                    components={{
                        body: {
                            row: EditableRow,
                            cell: EditableCell,
                        },
                    }}
                    className={styles['table-demo-editable-cell']}
                />
                <Modal
                    title={(
                        <div style={{textAlign: 'left'}}>添加分类</div>
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
                        <Form.Item label='分类名称' field='name' rules={[{ required: true, message: '请输入分类名称' }]}>
                            <Input placeholder='请输入分类名称' />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    )
}
export default Categories
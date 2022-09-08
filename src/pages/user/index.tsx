import React, {useEffect} from 'react';
import useLocale from "@/utils/useLocale";
import {
    Button,
    Card,
    Form,
    Image,
    Input,
    Message,
    Popconfirm,
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
import {getList, remove} from "@/api/user";
import {ReducerState} from "@/redux";

function Categories() {
    const locale = useLocale()

    const columns:any = [
        {
            title: '昵称',
            dataIndex: 'nickName',
            align: 'center',
            width: 100,
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            align: 'center',
            render: (_,record) => {
                return (
                    <Image width={50} height={50} src={record.avatar}/>
                )
            }
        },
        {
            title: '来源',
            dataIndex: 'provider',
            align: 'center',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'center',
            width: 110,
        },
        {
            title: '收藏数量',
            dataIndex: 'articleIds',
            align: 'center',
            width: 90,
            render: (_,record) => {
                return (
                    <Tag color="orange">{record.articleIds?.length}</Tag>
                )
            }
        },
        {
            title: '简介',
            dataIndex: 'introduction',
            align: 'center',
            render: (text) => {
                return (
                    <Tooltip content={text} position="tl">{text}</Tooltip>
                )
            }
        },
        {
            title: '注册时间',
            dataIndex: 'registerTime',
            align: 'center',
            width: 180,
        },
        {
            title: '操作',
            dataIndex: 'operations',
            align: 'center',
            render: (_,record)=>(
                <div className={styles.operations}>
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

    const userState = useSelector((state: ReducerState)=> state.user)
    const { data, pagination, loading, formParams } = userState
    const dispatch = useDispatch()

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

    function onSearch(nickName) {
        fetchData(1, pagination.pageSize, { nickName })
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
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        <Input.Search
                            style={{width: 300}}
                            searchButton
                            placeholder="请输入昵称"
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
                />
            </Card>
        </div>
    )
}
export default Categories
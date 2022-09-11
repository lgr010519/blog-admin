import React, {useEffect, useState} from 'react';
import useLocale from "@/utils/useLocale";
import {
    Avatar,
    Badge,
    Button,
    Card,
    Form,
    Input,
    Message,
    Modal,
    Popconfirm, Radio,
    Select,
    Table, Tag, Tooltip, Typography
} from "@arco-design/web-react";
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
import {getListRecommend, createRecommend, updateRecommend, removeRecommend} from "@/api/site/right";
import {ReducerState} from "@/redux";
import {IconCheck, IconClose, IconLink} from "@arco-design/web-react/icon";
import {projects, showPositionColorObj, showPositions} from "@/constant";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";
import UploadImage from "@/components/UploadImage";

function Tab2() {
    const locale = useLocale()
    const [title, setTitle] = useState('添加标签')

    const copyLink = (msg) => {
        if (copy(msg)) {
            Message.success('复制成功')
        } else {
            Message.error('复制失败')
        }
    }

    const columns: any = [
        {
            title: '类别',
            dataIndex: 'project',
            align: 'center',
            width: 100,
            render: (_, record) => {
                const colorObj = {
                    1: 'purple',
                    2: 'pink',
                    3: '#52c41a'
                }
                const text = projects[+record.project - 1].value
                return <Badge dotStyle={{background: colorObj[+record.project]}} text={text}/>
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            align: 'center',
            width: 110
        },
        {
            title: '封面',
            dataIndex: 'cover',
            align: 'center',
            render: (_, record) => (
                <Avatar shape='square'>
                    <img src={record.cover}/>
                </Avatar>
            )
        },
        {
            title: '链接',
            dataIndex: 'link',
            align: 'center',
            render: (_, record) => (
                <Tooltip content={record.link}>
                    <a style={{cursor: 'pointer'}}><IconLink onClick={() => copyLink(record.link)}/></a>
                </Tooltip>
            )
        },
        {
            title: 'VIP',
            dataIndex: 'isVip',
            align: 'center',
            render: (_, record) => record.isVip ? '是' : '否'
        },
        {
            title: '展示位置',
            dataIndex: 'showPosition',
            align: 'center',
            render: (_, record) => {
                const result = []
                for (let i = 0; i < record.showPosition.length; i += 3) {
                    result.push(record.showPosition.slice(i, i + 3))
                }
                return result.map((item, index) => {
                    return (
                        <div key={index} style={{marginBottom: 10}}>
                            {
                                item.map(sub => <Tag style={{marginRight: 10}} key={sub}
                                                     color={showPositionColorObj[sub]}>{sub}</Tag>)
                            }
                        </div>
                    )
                })
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            align: 'center',
            width: 110,
            render: (_, record) => (
                dayjs(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
            )
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            align: 'center',
            width: 110,
            render: (_, record) => (
                record.updateTime ? dayjs(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
            )
        },
        {
            title: '操作',
            dataIndex: 'operations',
            align: 'center',
            render: (_, record) => (
                <div className={styles.operations}>
                    <Button disabled={record.status} onClick={() => onUpdate(record)} type="text" size="small">
                        修改
                    </Button>
                    <Popconfirm
                        title='确定删除吗?'
                        onOk={() => onDelete(record)}
                        disabled={record.status}
                    >
                        <Button disabled={record.status} type="text" status="danger" size="small">
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            )
        },
    ]

    const recommendState = useSelector((state: ReducerState) => state.recommend)
    const {data, pagination, loading, formParams, visible, confirmLoading} = recommendState
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

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(current = 1, pageSize = 20, params = {}) {
        dispatch({type: UPDATE_LOADING, payload: {loading: true}})
        try {
            const result: any = await getListRecommend({
                page: current,
                pageSize,
                ...params,
            })
            if (result) {
                dispatch({type: UPDATE_LOADING, payload: {loading: false}})
                dispatch({type: UPDATE_LIST, payload: {data: result.list}})
                dispatch({
                    type: UPDATE_PAGINATION,
                    payload: {pagination: {...pagination, current, pageSize, total: result.totalCount}}
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
        dispatch({
            type: TOGGLE_VISIBLE,
            payload: {
                visible: true
            }
        })
        setTitle('添加标签')
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
        if (data.imgs && data.imgs.length) {
            data.cover = data.imgs[0].imgUrl
            data.link = data.imgs[0].link
        }
        let func = createRecommend
        if (data._id) {
            func = updateRecommend
        }
        dispatch({
            type: TOGGLE_CONFIRM_LOADING,
            payload: {
                confirmLoading: true
            }
        })
        const result: any = await func(data)
        if (result.code === 0) {
            dispatch({
                type: TOGGLE_CONFIRM_LOADING,
                payload: {
                    confirmLoading: false
                }
            })
            onCancel()
            fetchData().then(Message.success(result.msg))
        } else {
            Message.success('添加失败，请重试')
        }
    }
    const onUpdate = (row) => {
        dispatch({
            type: TOGGLE_VISIBLE,
            payload: {
                visible: true
            }
        })
        setTitle('修改标签')
        row.imgs = [{
            imgUrl: row.cover,
            link: row.link
        }]
        form.setFieldsValue(row)
    }
    const onDelete = async (row) => {
        const result: any = await removeRecommend(row)
        if (result.code === 0) {
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
                        <Button type="primary" onClick={onAdd}>添加推荐</Button>
                    </div>
                    <div>
                        <Select style={{width: 300}} placeholder="请选择推荐项目" onChange={onSelectChange} defaultValue="">
                            {
                                [{key: '', value: '全部'}, ...projects].map(item => <Select.Option key={item.key}
                                                                                                 value={item.key}>{item.value}</Select.Option>)
                            }
                        </Select>
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
                <Modal
                    title={(
                        <div style={{textAlign: 'left'}}>{title}</div>
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
                        <Form.Item label='推荐项目' field='project' rules={[{required: true, message: '请选择推荐项目'}]}>
                            <Select placeholder="请选择推荐项目">
                                {
                                    projects.map(item => <Select.Option key={item.key}
                                                                        value={item.key}>{item.value}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label='名称' field='name' rules={[{required: true, message: '请输入名称'}]}>
                            <Input placeholder='请输入名称'/>
                        </Form.Item>
                        <Form.Item label="展示位置" field="showPosition"
                                   rules={[{required: true, message: '请选择展示位置'}]}>
                            <Select mode="multiple" placeholder="请选择展示位置">
                                {showPositions.map((option) => (
                                    <Select.Option key={option} value={option}>
                                        {option}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='平台' field='platform' rules={[{required: true, message: '请输入平台'}]}>
                            <Input placeholder='请输入平台'/>
                        </Form.Item>
                        <Form.Item label='是否需要VIP' field='isVip'>
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='封面/链接' field='imgs' rules={[{required: true, message: '请上传封面/链接'}]}>
                            <UploadImage/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    )
}

export default Tab2
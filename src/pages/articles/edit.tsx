import React, {useEffect, useRef, useState} from "react";
import styles from './style/index.module.less'
import {Button, Card, Form, Grid, Input, InputNumber, Message, Select, Switch} from "@arco-design/web-react";
import Save from "@/components/Save";
import UploadImage from '@/components/UploadImage'
import {create, queryArticles, update} from "@/api/articles";
import layout from "@/layout";
import {getList as getCategoriesList} from "@/api/categories";
import {getList as getTagsList} from "@/api/tags";
import MdEditor from "for-editor";
import {upload} from "@/api/common";
import useLocale from "@/utils/useLocale";
import {useLocation} from "react-router";

const Edit = () => {
  const [form] = Form.useForm()
  const [time, setTime] = useState()
  const layout = {
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 22
    }
  }
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 18
    }
  }
  const formItemLayout2 = {
    labelCol: {
      span: 11
    },
    wrapperCol: {
      span: 13
    }
  }
  const [categoriesArr, setCategoriesArr] = useState([])
  const [tagsArr, setTagsArr] = useState([])
  const editorRef = useRef<any>()
  const {search} = useLocation()

  const onRefresh = () => {
    loadData(true)
  }

  const onSave = async (publishStatus) => {
    await form.validate()
    const values = await form.getFields()
    values.cover = values.cover[0].imgUrl
    values.publishStatus = publishStatus
    values.status = 1
    if (id) {
      values.id = id
    }
    const func = id ? update : create
    const result: any = await func(values)
    if (result.code === 200) {
      Message.success(result.msg)
      location.href = '/articles'
    } else {
      Message.error('保存失败，请重试')
    }
  }

  let id = ''
  if (search) {
    id = search.split('id=')[1]
  }
  const loadData = async (isRefresh?: boolean) => {
    if (!id) return
    const result: any = await queryArticles({id})
    if (isRefresh) {
      Message.success('刷新成功')
    }
    const data = result.data
    if (!data) return
    data.cover = [{
      imgUrl: data.cover
    }]
    form.setFieldsValue(data)
    setTime(data.updateTime)
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

  const addImg = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    // const result = await upload(formData)
    const result = [
      {
        hash: 'afshjdvsadlkjfhsdajnv',
        key: '390485734895731141.png',
        url: 'http://localhost:3000'
      }
    ]
    if (result) {
      editorRef.current.$img2Url(file.name, result[0].url)
    }
  }

  useEffect(() => {
    getTags()
    getCategories()
    loadData()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Card hoverable>
          <Form {...layout} form={form} initialValues={{
            isCollect: false,
            isComment: false,
            isLike: false,
            views: 0,
            like: 0,
            collect: 0,
            comment: 0,
          }}>
            <Form.Item label="文章标题" field="title" rules={[{required: true, message: '请输入文章标题'}]}>
              <Input placeholder="请输入文章标题"/>
            </Form.Item>
            <Form.Item
              label="文章简介"
              field="introduction"
              rules={[{required: true, message: '请输入文章简介'},
                {minLength: 10, message: '至少10个字符'},
                {maxLength: 500, message: '不能超过500个字符'}
              ]}
            >
              <Input.TextArea rows={5} minLength={10} maxLength={500} showWordLimit/>
            </Form.Item>
            <Grid.Row className='grid-demo' style={{marginBottom: 16}}>
              <Grid.Col span={12}>
                <Form.Item label="文章封面" field="cover" {...formItemLayout}
                           rules={[{required: true, message: '请上传文章封面'}]}>
                  <UploadImage showAction={false} showLink={false}/>
                </Form.Item>
                <Form.Item field="categories" label="选择分类" {...formItemLayout}
                           rules={[{required: true, message: '请选择文章分类'}]}>
                  <Select placeholder="请选择文章分类"
                          defaultValue="">
                    {
                      categoriesArr.map(item => <Select.Option
                        key={item.key}
                        value={item.value}>{item.value}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
                <Form.Item field="tags" label="选择标签" {...formItemLayout}
                           rules={[{required: true, message: '请选择文章标签'}]}>
                  <Select placeholder="请选择文章标签"
                          mode="multiple">
                    {
                      tagsArr.map(item => <Select.Option key={item.key}
                                                         value={item.value}>{item.value}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Grid.Col>
              <Grid.Col span={12}>
                <Grid.Row>
                  <Grid.Col span={8}>
                    <Form.Item label="评论" layout="inline" field="isComment"
                               triggerPropName="checked">
                      <Switch checkedText="显示" uncheckedText="隐藏"/>
                    </Form.Item>
                    <Form.Item label="点赞" layout="inline" field="isLike"
                               triggerPropName="checked">
                      <Switch checkedText="显示" uncheckedText="隐藏"/>
                    </Form.Item>
                    <Form.Item label="收藏" layout="inline" field="isCollect"
                               triggerPropName="checked">
                      <Switch checkedText="显示" uncheckedText="隐藏"/>
                    </Form.Item>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Form.Item label="查看数量" field="views" {...formItemLayout2}
                               rules={[{required: true, message: '请输入查看数量'}]}>
                      <InputNumber placeholder="请输入"/>
                    </Form.Item>
                    <Form.Item label="点赞数量" field="like" {...formItemLayout2}
                               rules={[{required: true, message: '请输入点赞数量'}]}>
                      <InputNumber placeholder="请输入"/>
                    </Form.Item>
                    <Form.Item label="收藏数量" field="collect" {...formItemLayout2}
                               rules={[{required: true, message: '请输入收藏数量'}]}>
                      <InputNumber placeholder="请输入"/>
                    </Form.Item>
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
            </Grid.Row>
            <Form.Item wrapperCol={{span: 24}} field="content" rules={[{required: true, message: '请撰写文章'}]}>
              <MdEditor ref={(el) => editorRef.current = el} addImg={(file) => addImg(file)}
                        placeholder="请撰写文章..."
                        height="400px"/>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Save time={time} showBack onRefresh={id && onRefresh} onSave={() => onSave(2)} onPublish={() => onSave(1)}/>
    </>
  )
}

export default Edit

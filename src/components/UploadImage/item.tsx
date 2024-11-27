import React, { useEffect, useState } from 'react';
import styles from './item.module.less';
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Spin,
  Upload,
} from '@arco-design/web-react';
import { IconDelete, IconPlus } from '@arco-design/web-react/icon';
import { imagesType } from '@/constant';
import { fileUpload } from '@/api/fileUpload';

const Item = (props) => {
  const {
    onChange,
    onRemove,
    onAdd,
    index = 0,
    showImg,
    showLink,
    showAction,
    showAdd,
    showReduce = false,
    imgUrl,
  } = props;
  const [imageUrl, setImageUrl] = useState<string>(imgUrl || '');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageUrl(imgUrl);
    form.setFieldsValue({ imgUrl });
  }, [imgUrl]);

  const onOk = async () => {
    await form.validate();
    const values = form.getFields();
    onChange({
      index,
      field: 'imgUrl',
      value: values.imgUrl,
    });
    onCancel();
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleChangeLink = (value) => {
    onChange({
      index,
      field: 'link',
      value,
    });
  };

  const beforeUpload = async (file) => {
    const isImage = imagesType.includes(file.type);
    if (!isImage) {
      return Message.warning('请上传jpg、png、jpeg或gif格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return Message.warning('图片大小不能超过2MB');
    }
    setLoading(true);
    setImageUrl('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fileUpload(formData);
      setImageUrl(res.data);
      onChange({
        index,
        field: 'imgUrl',
        value: res.data,
      });
    } catch (error) {
      console.log(error);
      Message.error('上传失败，请重试');
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <div className={styles.item}>
      <div className={styles['item-content']}>
        {showImg && (
          <div className={styles['upload-wrapper']}>
            <Upload
              showUploadList={false}
              name="file"
              listType="picture-card"
              beforeUpload={beforeUpload}
            >
              {imageUrl ? (
                <div className="arco-upload-list-item-picture custom-upload-avatar">
                  <img src={imageUrl} alt="" />
                  <div className="arco-upload-list-item-picture-mask">
                    <IconPlus />
                  </div>
                </div>
              ) : (
                <div className="arco-upload-trigger-picture">
                  <div className="arco-upload-trigger-picture-text">
                    {loading ? <Spin /> : <IconPlus />}
                  </div>
                </div>
              )}
            </Upload>
            <Button
              type="primary"
              className={styles['btn-input']}
              onClick={() => setVisible(true)}
            >
              输入链接
            </Button>
          </div>
        )}
        <div>
          {showLink && (
            <Input
              onChange={handleChangeLink}
              value={imgUrl}
              className={styles.input}
              addBefore="链接"
            />
          )}
        </div>
        {showAction && (
          <div className={styles.action}>
            {showReduce && (
              <Button
                icon={<IconDelete />}
                shape="circle"
                status="danger"
                className={styles.btn}
                onClick={() => onRemove(index)}
              />
            )}
            {showAdd && (
              <Button
                icon={<IconPlus />}
                shape="circle"
                status="success"
                className={styles.btn}
                onClick={onAdd}
              />
            )}
          </div>
        )}
        <Modal
          title={<div style={{ textAlign: 'left' }}>图片链接</div>}
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          <Form form={form}>
            <Form.Item
              label="图片链接"
              field="imgUrl"
              rules={[{ required: true, message: '请输入图片链接' }]}
            >
              <Input placeholder="请输入图片链接" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Item;

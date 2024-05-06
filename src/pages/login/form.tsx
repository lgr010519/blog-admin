import { Button, Form, Input, Message, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { login as adminLogin } from '@/api/login';
import { useDispatch } from 'react-redux';

export default function LoginForm({ history }) {
  const t = useLocale(locale);
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function onLogin() {
    formRef.current.validate().then(async (values) => {
      setErrorMessage('');
      setLoading(true);
      try {
        const res: any = await adminLogin(values);
        if (res.code === 0) {
          Message.success('登录成功');
          // 记录登录状态
          localStorage.setItem('token', res.data.token);
          dispatch({
            type: 'LOGIN',
            payload: res.data,
          });
          // 跳转首页
          history.replace('/');
        } else {
          setErrorMessage(res.msg || t['login.form.login.errMsg']);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    });
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ username: 'admin123', password: '123456' }}
      >
        <Form.Item
          field="username"
          rules={[
            { required: true, message: t['login.form.username.errMsg1'] },
            {
              match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
              message: t['login.form.username.errMsg2'],
            },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.username.placeholder']}
            onPressEnter={onLogin}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: t['login.form.password.errMsg1'] },
            {
              match: /^[A-Za-z0-9_]{6,20}$/,
              message: t['login.form.password.errMsg2'],
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onLogin}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <Button type="primary" long onClick={onLogin} loading={loading}>
            {t['login.form.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}

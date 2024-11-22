import { Button, Form, Input, Message, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { useDispatch } from 'react-redux';
import * as api from '@/api/login';

export default function LoginForm({ history }) {
  const t = useLocale(locale);
  const dispatch = useDispatch();
  const formRef = useRef<FormInstance>();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({
    image: '',
    key: '',
  });

  const getCaptcha = async () => {
    try {
      const res = await api.getCaptcha();
      setCaptcha(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = () => {
    formRef.current.validate().then(async (values) => {
      setLoading(true);
      try {
        const res: any = await api.login({
          ...values,
          captchaKey: captcha.key,
        });
        // 记录登录状态
        localStorage.setItem('token', res.data);
        const userInfo = await api.getUserInfo();
        console.log('userInfo', userInfo);
        // dispatch({
        //   type: 'LOGIN',
        //   payload: res.data,
        // });
        setLoading(false);
        Message.success('登录成功');
        // 跳转首页
        history.replace('/');
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ username: 'admin', password: '123456' }}
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
        <Space>
          <Form.Item
            field="captchaCode"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              style={{ width: '184px' }}
              prefix={<IconLock />}
              placeholder="请输入验证码"
              onPressEnter={onLogin}
            />
          </Form.Item>
          <img
            src={captcha.image}
            alt=""
            onClick={getCaptcha}
            style={{ cursor: 'pointer', marginTop: '-14px' }}
          />
        </Space>
        <Space size={16} direction="vertical">
          <Button type="primary" long onClick={onLogin} loading={loading}>
            {t['login.form.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}

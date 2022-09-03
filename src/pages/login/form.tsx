import {
  Form,
  Input,
  Button,
  Space,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import {login as adminLogin} from "@/api/login";
import {useDispatch} from "react-redux";

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');
  const t = useLocale(locale);
  const dispatch = useDispatch()

  function afterLoginSuccess(params) {
    // 记录登录状态
    localStorage.setItem('token', params.token);
    dispatch({
      type: 'LOGIN',
      payload: params
    })
    // 跳转首页
    window.location.href = '/';
  }

  async function login(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const result:any = await adminLogin(params)
      if(result.code === 1){
        afterLoginSuccess(result.data);
      }else{
        setErrorMessage(result.msg || t['login.form.login.errMsg']);
      }
    }catch (error){

    }finally {
      setLoading(false);
    }
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      {/*<div className={styles['login-form-sub-title']}>
        {t['login.form.title']}
      </div>*/}
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ userName: 'admin', password: '123456' }}
      >
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t['login.form.userName.errMsg1'] },
            {match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/, message: t['login.form.userName.errMsg2']}]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg1'] },
            {match: /^[A-Za-z0-9_]{6,20}$/, message: t['login.form.password.errMsg2']}]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          {/*<div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>*/}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          {/*<Button
            type="text"
            long
            className={styles['login-form-register-btn']}
          >
            {t['login.form.register']}
          </Button>*/}
        </Space>
      </Form>
    </div>
  );
}

import React from 'react';
import { Layout } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import cs from 'classnames';
import styles from './style/index.module.less';

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props;
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
        <a className={cs(styles.copyRight, className)} href="https://beian.miit.gov.cn">Copyright © 2022 LIUGAORONG・湘 ICP 备 2022010519 号</a>
        本系统由 React+Arco Design Pro 提供技术支持
    </Layout.Footer>
  );
}

export default Footer;
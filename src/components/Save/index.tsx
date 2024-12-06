import React from 'react';
import styles from './index.module.less';
import { Button, Card, Link } from '@arco-design/web-react';
import {
  IconClockCircle,
  IconDoubleLeft,
  IconEdit,
  IconRefresh,
  IconSave,
} from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import { ReducerState } from '@/redux';

const Save = (props) => {
  const { time, showBack, onBack, onRefresh, onSave, onPublish } = props;
  const message = time ? `上次更新时间：${time}` : '暂无操作';
  const goBack = () => {
    history.go(-1);
  };
  const { settings, collapsed } = useSelector(
    (state: ReducerState) => state.global
  );
  const width = collapsed
    ? `calc(100% - 48px)`
    : `calc(100% - ${settings.menuWidth}px)`;

  return (
    <Card bordered={false} className={styles.card} style={{ width }}>
      <div className={styles.box}>
        <Link icon={<IconClockCircle />}>{message}</Link>
        {showBack && (
          <Button
            onClick={onBack || goBack}
            className={styles.btn}
            type="outline"
            icon={<IconDoubleLeft />}
          >
            返回
          </Button>
        )}
        {onRefresh && (
          <Button
            onClick={onRefresh}
            className={styles.btn}
            type="outline"
            icon={<IconRefresh />}
          >
            刷新
          </Button>
        )}
        {onSave && (
          <Button
            onClick={onSave}
            className={styles.btn}
            type="primary"
            icon={<IconSave />}
          >
            保存
          </Button>
        )}
        {onPublish && (
          <Button
            onClick={onPublish}
            className={styles.btn}
            type="primary"
            icon={<IconEdit />}
          >
            发布
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Save;

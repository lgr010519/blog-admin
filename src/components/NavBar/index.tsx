import React, { useContext } from 'react';
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Message,
  Select,
  Tooltip,
} from '@arco-design/web-react';
import {
  IconEdit,
  IconLanguage,
  IconMoonFill,
  IconPoweroff,
  IconSettings,
  IconSunFill,
} from '@arco-design/web-react/icon';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';

export default function Navbar({ show, history }) {
  const t = useLocale();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);

  function onMenuItemClick(key: string) {
    if (key === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      history.push('/login');
    } else if (key === 'publish') {
      history.push('/articles/edit');
    }
  }

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="publish">
        <IconEdit className={styles['dropdown-icon']} />
        {t['navbar.publish']}
      </Menu.Item>
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>博客后台管理系统</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'br',
            }}
            trigger="hover"
            onChange={(value) => {
              setLang(value);
              const nextLang = defaultLocale[value];
              Message.info(`${nextLang['message.lang.tips']}${value}`);
            }}
          />
        </li>
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? t['settings.navbar.theme.toDark']
                : t['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                <img alt="avatar" src={userInfo.avatarUrl} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

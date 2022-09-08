import Mock from 'mockjs';
import { isSSR } from '@/utils/is';

import './user';
import './message-box';
import '@/pages/categories/mock'
import '@/pages/tags/mock'
import '@/pages/about/mock'
import '@/pages/user/mock'
import '@/pages/comment/mock'

if (!isSSR) {
  Mock.setup({
    timeout: '500-1500',
  });
}

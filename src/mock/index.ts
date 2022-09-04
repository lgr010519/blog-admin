import Mock from 'mockjs';
import { isSSR } from '@/utils/is';

import './user';
import './message-box';
import '@/pages/categories/mock'
import '@/pages/tags/mock'

if (!isSSR) {
  Mock.setup({
    timeout: '500-1500',
  });
}

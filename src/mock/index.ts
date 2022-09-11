import Mock from 'mockjs';
import { isSSR } from '@/utils/is';

import './user';
import './message-box';
import '@/pages/categories/mock'
import '@/pages/tags/mock'
import '@/pages/about/mock'
import '@/pages/user/mock'
import '@/pages/comment/mock'
import '@/pages/site/home/mock'
import '@/pages/site/headerFooter/mock'
import '@/pages/site/right/mock'
import '@/pages/articles/mock'

if (!isSSR) {
  Mock.setup({
    timeout: '500-1500',
  });
}

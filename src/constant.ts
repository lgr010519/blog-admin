export const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

export const imagesType = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];

export const auditStatusOptions = [
  // 0=未审核，1=通过，2=驳回
  {
    value: '',
    label: '全部',
  },
  {
    value: 0,
    label: '未审核',
  },
  {
    value: 1,
    label: '通过',
  },
  {
    value: 2,
    label: '驳回',
  },
];

export const showPositions = [
  '首页',
  '文章',
  '文章详情',
  '归档',
  '分类',
  '分类详情',
  '标签',
  '标签详情',
  '关于',
];

export const showPositionColorObj = {
  首页: 'blue',
  文章: '#87d068',
  文章详情: '#ccc',
  归档: '#f50',
  分类: 'gold',
  分类详情: 'lime',
  标签: '#108ee9',
  标签详情: 'cyan',
  关于: '#2db7f5',
};

export const projects = [
  {
    key: '1',
    value: '电影',
  },
  {
    key: '2',
    value: '电视剧',
  },
  {
    key: '3',
    value: '音乐',
  },
];

export const statusOptions = [
  { key: '0', value: '停用' },
  { key: '1', value: '启用' },
];

export const publishStatusOptions = [
  { key: '0', value: '未发布' },
  { key: '1', value: '已发布' },
];

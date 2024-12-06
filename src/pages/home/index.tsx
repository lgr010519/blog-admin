import React, { useEffect } from 'react';
import { Card, Grid } from '@arco-design/web-react';
import {
  Axis,
  Chart,
  Coordinate,
  getTheme,
  Interaction,
  Interval,
  Legend,
  Line,
  LineAdvance,
} from 'bizcharts';
import styles from './style/index.module.less';
import { getUserGrowthList } from '@/api/home';
import { getList as getCategoryList } from '@/api/categories';
import { getList as getTagList } from '@/api/tags';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '@/redux';
import {
  UPDATE_ARTICLE_NUM_BY_CATEGORIES,
  UPDATE_ARTICLE_NUM_BY_TAGS,
  UPDATE_USER_GROWTH_DATA,
} from '@/pages/home/redux/actionTypes';

const Home = () => {
  const Row = Grid.Row;
  const Col = Grid.Col;

  const HomeState = useSelector((state: ReducerState) => state.home);
  const { userGrowthData, articleNumByCategories, articleNumByTags } =
    HomeState;
  const dispatch = useDispatch();

  const data = [
    { month: '2022-12-15', acc: 12 },
    { month: '2023-01-01', acc: 18 },
    { month: '2023-01-15', acc: 19 },
    { month: '2023-02-01', acc: 23 },
    { month: '2023-02-15', acc: 21 },
    { month: '2023-03-01', acc: 19 },
    { month: '2023-03-15', acc: 22 },
    { month: '2023-04-01', acc: 20 },
    { month: '2023-04-15', acc: 24 },
    { month: '2023-05-01', acc: 28 },
    { month: '2023-05-15', acc: 36 },
    { month: '2023-06-01', acc: 35 },
  ];

  const getUserGrowthData = async () => {
    try {
      const res: any = await getUserGrowthList();
      const handleRes = res.data.map(
        (item: { period: string; userNum: number }) => ({
          date: item.period.split(' ')[1],
          value: item.userNum,
        })
      );
      dispatch({
        type: UPDATE_USER_GROWTH_DATA,
        payload: {
          userGrowthData: handleRes,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getArticleNumByCategories = async () => {
    try {
      const res: any = await getCategoryList({
        current: 1,
        size: -1,
      });
      dispatch({
        type: UPDATE_ARTICLE_NUM_BY_CATEGORIES,
        payload: {
          articleNumByCategories: res.data.records,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getListByTag = async () => {
    try {
      const res: any = await getTagList({
        current: 1,
        size: -1,
      });
      dispatch({
        type: UPDATE_ARTICLE_NUM_BY_TAGS,
        payload: {
          articleNumByTags: res.data.records,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserGrowthData();
    getArticleNumByCategories();
    getListByTag();
  }, []);

  return (
    <div className={styles.page}>
      <Row gutter={14}>
        <Col span={9}>
          <Card title="用户增长统计" style={{ height: 306 }}>
            <Chart autoFit height={220} data={userGrowthData}>
              <LineAdvance shape="smooth" position="date*value" point area />
              <Axis name="sold" />
            </Chart>
          </Card>
        </Col>
        <Col span={15}>
          <Card title="文章分类数量统计">
            <Chart height={220} autoFit data={articleNumByCategories}>
              <Interval position="name*articleNum" color="name" />
              <Legend position={'top'} />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{ marginTop: 14 }}>
        <Col span={24}>
          <Card title="文章标签数量统计" style={{ height: 336 }}>
            <Chart height={220} autoFit data={articleNumByTags}>
              <Interval position="name*articleNum" color="name" />
              <Legend position={'top'} />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{ marginTop: 14 }}>
        <Col span={12}>
          <Card title="文章分类占比统计">
            <Chart height={250} data={articleNumByCategories} autoFit>
              <Legend position={'right'} />
              <Coordinate type="theta" radius={0.75} />
              <Interval
                position="articleNum"
                adjust="stack"
                color="name"
                label="name"
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                state={{
                  selected: {
                    style: (t) => {
                      const res =
                        getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: 'red' };
                    },
                  },
                }}
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="文章标签占比统计">
            <Chart height={250} data={articleNumByTags} autoFit>
              <Legend position={'right'} />
              <Coordinate type="theta" radius={0.75} />
              <Interval
                position="articleNum"
                adjust="stack"
                color="name"
                label="name"
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                state={{
                  selected: {
                    style: (t) => {
                      const res =
                        getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: 'red' };
                    },
                  },
                }}
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{ marginTop: 14 }}>
        <Col span={24}>
          <Card title="客户端访问量统计">
            <Chart autoFit height={200} data={data}>
              <Line
                shape="smooth"
                position="month*acc"
                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
              />
            </Chart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

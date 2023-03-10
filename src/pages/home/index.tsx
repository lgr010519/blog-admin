import React, {useEffect} from 'react';
import {Grid, Card} from "@arco-design/web-react";
import {Chart, Coordinate, Interaction, Interval, Legend, Line, getTheme} from 'bizcharts';
import styles from './style/index.module.less'
import {getUserNum, getList, getTagList} from "@/api/home";
import {useDispatch, useSelector} from "react-redux";
import {ReducerState} from "@/redux";
import {
  UPDATE_USER_NUM,
  UPDATE_ARTICLE_NUM_BY_CATEGORIES,
  UPDATE_ARTICLE_NUM_BY_TAGS
} from "@/pages/home/redux/actionTypes";

const Home = () => {
  const Row = Grid.Row
  const Col = Grid.Col

  const HomeState = useSelector((state: ReducerState) => state.home)
  const {userNum, articleNumByCategories, articleNumByTags} = HomeState
  const dispatch = useDispatch()

  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };

  const data = [
    {month: "2022-12-15", acc: 12},
    {month: "2023-01-01", acc: 18},
    {month: "2023-01-15", acc: 19},
    {month: "2023-02-01", acc: 23},
    {month: "2023-02-15", acc: 21},
    {month: "2023-03-01", acc: 19},
    {month: "2023-03-15", acc: 22},
    {month: "2023-04-01", acc: 20},
    {month: "2023-04-15", acc: 24},
    {month: "2023-05-01", acc: 28},
    {month: "2023-05-15", acc: 36},
    {month: "2023-06-01", acc: 35}
  ];

  const getUserNumData = async () => {
    const res: any = await getUserNum()
    if (res.code === 200) {
      dispatch({type: UPDATE_USER_NUM, payload: {userNum: res.data.userNum}})
    }
  }

  const getArticleNumByCategories = async () => {
    const res: any = await getList({
      page: 1,
      pageSize: 9999
    })
    if (res.code === 200) {
      dispatch({type: UPDATE_ARTICLE_NUM_BY_CATEGORIES, payload: {articleNumByCategories: res.data.list}})
    }
  }

  const getListByTag = async () => {
    const res: any = await getTagList({
      page: 1,
      pageSize: 9999
    })
    if (res.code === 200) {
      dispatch({type: UPDATE_ARTICLE_NUM_BY_TAGS, payload: {articleNumByTags: res.data.list}})
    }
  }

  useEffect(() => {
    getUserNumData()
    getArticleNumByCategories()
    getListByTag()
  }, [])

  return (
    <div className={styles.page}>
      <Row gutter={14}>
        <Col span={9}>
          <Card title="用户统计" style={{height: 306}}>
            <div className={styles.box}>
              {userNum?.map(item => (
                <div
                  key={item._id}
                  className={styles.boxItem}>
                  <span className={styles.boxItemSpan}>{item.nickName}</span><br/>
                  超级管理员
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={15}>
          <Card title="文章分类数量统计">
            <Chart height={220} autoFit data={articleNumByCategories}>
              <Interval
                position="name*articleNum"
                color="name"
              />
              <Legend position={"top"}/>
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={24}>
          <Card title="文章标签数量统计" style={{height: 336}}>
            <Chart height={220} autoFit data={articleNumByTags}>
              <Interval
                position="name*articleNum"
                color="name"
              />
              <Legend position={"top"}/>
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={12}>
          <Card title="文章分类占比统计">
            <Chart height={250} data={articleNumByCategories} scale={cols} autoFit>
              <Legend position={"right"}/>
              <Coordinate type="theta" radius={0.75}/>
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
                      const res = getTheme().geometries.interval.rect.selected.style(t);
                      return {...res, fill: 'red'}
                    }
                  }
                }}
              />
              <Interaction type='element-single-selected'/>
            </Chart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="文章标签占比统计">
            <Chart height={250} data={articleNumByTags} scale={cols} autoFit>
              <Legend position={"right"}/>
              <Coordinate type="theta" radius={0.75}/>
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
                      const res = getTheme().geometries.interval.rect.selected.style(t);
                      return {...res, fill: 'red'}
                    }
                  }
                }}
              />
              <Interaction type='element-single-selected'/>
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={24}>
          <Card title="客户端访问量统计">
            <Chart scale={{value: {min: 0}}} padding={[10, 20, 50, 40]} autoFit height={200} data={data}>
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

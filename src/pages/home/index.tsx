import React from 'react';
import {Grid, Card, DatePicker} from "@arco-design/web-react";
import {Chart, Coordinate, Interaction, Interval, Legend, Line, getTheme} from 'bizcharts';
import styles from './index.module.less'

const Home = () => {
  const Row = Grid.Row
  const Col = Grid.Col

  const data1 = [
    {year: '1951 年', sales: 38},
    {year: '1952 年', sales: 52},
    {year: '1956 年', sales: 61},
    {year: '1957 年', sales: 45},
    {year: '1958 年', sales: 48},
    {year: '1959 年', sales: 38},
    {year: '1960 年', sales: 38},
    {year: '1962 年', sales: 38},
  ];

  const data2 = [
    {item: '事例一', count: 40, percent: 0.4},
    {item: '事例二', count: 21, percent: 0.21},
    {item: '事例三', count: 17, percent: 0.17},
    {item: '事例四', count: 13, percent: 0.13},
    {item: '事例五', count: 9, percent: 0.09},
  ];

  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };

  const data3 = [
    { month: "2015-01-01", acc: 84.0 },
    { month: "2015-02-01", acc: 14.9 },
    { month: "2015-03-01", acc: 17.0 },
    { month: "2015-04-01", acc: 20.2 },
    { month: "2015-05-01", acc: 55.6 },
    { month: "2015-06-01", acc: 56.7 },
    { month: "2015-07-01", acc: 30.6 },
    { month: "2015-08-01", acc: 63.2 },
    { month: "2015-09-01", acc: 24.6 },
    { month: "2015-10-01", acc: 14.0 },
    { month: "2015-11-01", acc: 9.4 },
    { month: "2015-12-01", acc: 7.3 }
  ];

  return (
    <div className={styles.page}>
      <Row gutter={14}>
        <Col span={9}>
          <Card title="用户数量统计" style={{height: 306}}>
            <div
              className={styles.boxItem}>
              <span style={{color: '#fff', fontSize: 24}}>admin</span><br/>
              超级管理员
            </div>
          </Card>
        </Col>
        <Col span={15}>
          <Card title="文章类型统计">
            <Chart height={220} autoFit data={data1}>
              <Interval
                position="year*sales"
                color="year"
              />
              <Legend position={"top"}/>
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={11}>
          <Card title="文章分类占比统计" extra="2021年度">
            <Chart height={250} data={data2} scale={cols} autoFit>
              <Legend position={"right"}/>
              <Coordinate type="theta" radius={0.75}/>
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                label="item"
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                state={{
                  selected: {
                    style: (t) => {
                      const res = getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: 'red' }
                    }
                  }
                }}
              />
              <Interaction type='element-single-selected' />
            </Chart>
          </Card>
        </Col>
        <Col span={13}>
          <Card title="分类数量统计" style={{height: 336}} extra="2021年度">
            <div style={{display: "flex", justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 24}}>
              <div className={styles.boxItem}>
                <span style={{color: '#fff', fontSize: 24}}>19002</span><br/>
                路基（米）
              </div>
              <div className={styles.boxItem}>
                <span style={{color: '#fff', fontSize: 24}}>15290</span><br/>
                路面（米）
              </div>
              <div className={styles.boxItem}>
                <span style={{color: '#fff', fontSize: 24}}>3057797.38</span><br/>
                桥梁（平米）
              </div>
              <div className={styles.boxItem}>
                <span style={{color: '#fff', fontSize: 24}}>2462.466</span><br/>
                绿化（公里）
              </div>
              <div className={styles.boxItem}>
                <span style={{color: '#fff', fontSize: 24}}>0</span><br/>
                隧道（个）
              </div>
              <div className={styles.boxItem}>
                <span style={{color: '#fff', fontSize: 24}}>0</span><br/>
                涵洞（个）
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={24}>
          <Card title="标签数量统计">
            <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={200} data={data3} >
              <Line
                shape="smooth"
                position="month*acc"
                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
              />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={24}>
          <Card title="客户端访问量统计"
                extra={<DatePicker/>}>
            {/*<Chart height={200} padding="auto" data={data6} autoFit>*/}
            {/*  <Interval*/}
            {/*    adjust={[*/}
            {/*      {*/}
            {/*        type: 'dodge',*/}
            {/*        marginRatio: 0,*/}
            {/*      },*/}
            {/*    ]}*/}
            {/*    color="name"*/}
            {/*    position="地区*数据"*/}
            {/*  />*/}
            {/*  <Tooltip shared/>*/}
            {/*  <Legend position={"top"}/>*/}
            {/*</Chart>*/}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

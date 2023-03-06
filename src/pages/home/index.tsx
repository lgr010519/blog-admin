import React from 'react';
import {Grid, Card, DatePicker} from "@arco-design/web-react";
import {Axis, Chart, Coordinate, getTheme, Interaction, Interval, Legend, Tooltip} from 'bizcharts';
import axios from "axios";

const Home = () => {
  const message = {
    "data": [{
      "unit": "亿元",
      "value": 506.0,
      "key": "普通国道价值"
    }, {
      "unit": "亿元",
      "value": 295.0,
      "key": "普通省道价值"
    }, {
      "unit": "亿元",
      "value": 802.0,
      "key": "普通公路总价值"
    }, {
      "unit": "亿元",
      "value": 116.68,
      "key": "公路资产组成_路基"
    }, {
      "unit": "亿元",
      "value": 190.37,
      "key": "公路资产组成_路面"
    }, {
      "unit": "亿元",
      "value": 224.74,
      "key": "公路资产组成_桥涵"
    }, {
      "unit": "亿元",
      "value": 15.46,
      "key": "公路资产组成_绿化"
    }, {
      "unit": "亿元",
      "value": 6.5,
      "key": "公路资产组成_交通设施"
    }, {
      "unit": "亿元",
      "value": 73.98,
      "key": "公路资产组成_其他"
    }, {
      "unit": "%",
      "value": 18.59,
      "key": "公路资产占比_路基"
    }, {
      "unit": "%",
      "value": 30.33,
      "key": "公路资产占比_路面"
    }, {
      "unit": "%",
      "value": 35.8,
      "key": "公路资产占比_桥涵"
    }, {
      "unit": "%",
      "value": 2.46,
      "key": "公路资产占比_绿化"
    }, {
      "unit": "%",
      "value": 1.04,
      "key": "公路资产占比_交通设施"
    }, {
      "unit": "%",
      "value": 11.79,
      "key": "公路资产占比_其他"
    }, {
      "unit": "米",
      "value": 19002.0,
      "key": "公路资产统计_路基"
    }, {
      "unit": "米",
      "value": 15290.0,
      "key": "公路资产统计_路面"
    }, {
      "unit": "公里",
      "value": 2462.466,
      "key": "公路资产统计_绿化"
    }, {
      "unit": "个",
      "value": 0.0,
      "key": "公路资产统计_隧道"
    }, {
      "unit": "个",
      "value": 0.0,
      "key": "公路资产统计_涵洞"
    }, {
      "unit": "平米",
      "value": 3057797.38,
      "key": "公路资产统计_桥梁"
    }],
    "data2": [{
      "路面": 82391.87,
      "交通安全设施": 3365.52,
      "x": "津南区",
      "路基": 38660.83,
      "其他": 21402.25,
      "桥涵": 12455.67,
      "隧道": 144.0
    }, {
      "路面": 173983.4,
      "交通安全设施": 8457.42,
      "x": "蓟州区",
      "路基": 83941.99,
      "其他": 55179.33,
      "桥涵": 87356.46,
      "隧道": 337.8
    }, {
      "路面": 127599.2,
      "交通安全设施": 4440.25,
      "x": "北辰区",
      "路基": 78940.0,
      "其他": 52964.32,
      "桥涵": 194610.62,
      "隧道": 54.0
    }, {
      "路面": 150188.7,
      "交通安全设施": 4254.73,
      "x": "西青区",
      "路基": 83967.75,
      "其他": 59084.99,
      "桥涵": 178393.58,
      "隧道": 60.24
    }, {
      "路面": 179253.47,
      "交通安全设施": 6695.88,
      "x": "新区",
      "路基": 120522.11,
      "其他": 62224.51,
      "桥涵": 121391.6,
      "隧道": 1553.5
    }, {
      "路面": 253993.27,
      "交通安全设施": 9325.09,
      "x": "静海区",
      "路基": 135961.21,
      "其他": 78341.28,
      "桥涵": 123705.04,
      "隧道": 2652.42
    }, {
      "路面": 256074.95,
      "交通安全设施": 10989.78,
      "x": "武清区",
      "路基": 123782.71,
      "其他": 80577.67,
      "桥涵": 138112.74,
      "隧道": 320.5
    }, {
      "路面": 153215.27,
      "交通安全设施": 6664.55,
      "x": "宁河区",
      "路基": 100546.15,
      "其他": 49378.41,
      "桥涵": 85179.82,
      "隧道": 2011.2
    }, {
      "路面": 115683.18,
      "交通安全设施": 3246.61,
      "x": "东丽区",
      "路基": 59144.7,
      "其他": 51711.54,
      "桥涵": 234211.3,
      "隧道": 46.92
    }, {
      "路面": 198802.17,
      "交通安全设施": 7579.22,
      "x": "宝坻区",
      "路基": 209910.46,
      "其他": 85759.0,
      "桥涵": 191692.73,
      "隧道": 147.48
    }, {
      "路面": 212534.88,
      "交通安全设施": 0.0,
      "x": "养护中心",
      "路基": 131441.78,
      "其他": 143178.34,
      "桥涵": 880317.55,
      "隧道": 1775.4
    }],
    "data3": [{
      "二级": 261830.09,
      "三级": 0,
      "四级": 0,
      "x": "津南区",
      "一级": 50481.89
    }, {
      "二级": 345564.59,
      "三级": 4805.01,
      "四级": 0,
      "x": "蓟州区",
      "一级": 170872.49
    }, {
      "二级": 121846.4,
      "三级": 0,
      "四级": 0,
      "x": "北辰区",
      "一级": 562810.32
    }, {
      "二级": 111032.66,
      "三级": 0,
      "四级": 0,
      "x": "西青区",
      "一级": 636992.61
    }, {
      "二级": 352830.72,
      "三级": 13328.0,
      "四级": 0,
      "x": "新区",
      "一级": 269910.66
    }, {
      "二级": 188360.39,
      "三级": 17026.38,
      "四级": 0,
      "x": "静海区",
      "一级": 537367.68
    }, {
      "二级": 252878.9,
      "三级": 0,
      "四级": 0,
      "x": "武清区",
      "一级": 474433.94
    }, {
      "二级": 114215.37,
      "三级": 23345.46,
      "四级": 0,
      "x": "宁河区",
      "一级": 328141.04
    }, {
      "二级": 124437.26,
      "三级": 0,
      "四级": 0,
      "x": "东丽区",
      "一级": 528704.57
    }, {
      "二级": 402243.07,
      "三级": 71559.42,
      "四级": 0,
      "x": "宝坻区",
      "一级": 324055.56
    }, {
      "二级": 61495.0,
      "三级": 0,
      "四级": 0,
      "x": "养护中心",
      "一级": 1667986.59
    }],
  }
  const Row = Grid.Row
  const Col = Grid.Col

  // 数据源
  const data1 = message.data.slice(0, 3)

  const data2_ = message.data.slice(3, 9)
  const data2: { genre: any; sold: any; }[] = []
  data2_.forEach((item: any) => {
    item.key = item.key.split('_')[1]
    data2.push({
      genre: item.key,
      sold: item.value
    })
  })

  const data3_ = message.data.slice(9, 15)
  const data3: any[] = []
  data3_.forEach((item: any) => {
    item.key = item.key.split('_')[1]
    console.log(item.key)
    data3.push({
      item: item.key,
      count: item.value,
      percent: Math.round(item.value) / 100
    })
  })

  const cols = {
    percent: {
      formatter: (val: any) => {
        // eslint-disable-next-line no-param-reassign
        val = val * 100 + '%';
        return val;
      },
    },
  };

  const data5_ = message.data2
  const x: string[] = []
  data5_.forEach(item => {
    x.push(item.x)
  })
  const data5: { type: any; date: string; count: any; total: number; }[] = []
  x.forEach(item => {
    data5_.forEach((obj) => {
      if (item == obj.x) {
        delete obj.x
        for (const i in obj) {
          data5.push({
            "type": i,
            "date": item,
            "count": obj[i],
            "total": 1,
          })
        }
      }
    })
  })
  const position = "date*count"

  const data6_ = message.data3
  const y: string[] = []
  data6_.forEach(item => {
    y.push(item.x)
  })
  const data6: { name: string; 地区: string; 数据: any; }[] = []
  y.forEach(item => {
    data6_.forEach((obj) => {
      if (item == obj.x) {
        delete obj.x
        for (const i in obj) {
          data6.push({
            name: i,
            地区: item,
            数据: obj[i]
          })
        }
      }
    })
  })


  const onChange = (date: string, dateString: string) => {
    axios.post('http://traffic-gateway-beijing.btismart.com/api-user/users/login', {
      date: dateString
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Row gutter={14}>
        <Col span={9}>
          <Card title="公路资产价值总计" hoverable style={{height: 306}} extra="2021年度">
            <div
              style={{
                boxSizing: 'border-box',
                width: 160,
                height: 80,
                background: 'rgb(108,174,233)',
                margin: "auto",
                marginBottom: 20,
                borderRadius: 5,
                color: '#fff',
                textAlign: 'center',
                paddingTop: 10,
                fontSize: 10
              }}>
              <span style={{color: '#fff', fontSize: 24}}>{data1[2].value}</span>{data1[2].unit}<br/>
              {data1[2].key}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div
                style={{
                  display: 'inline-block',
                  boxSizing: 'border-box',
                  width: 160,
                  height: 80,
                  background: 'rgb(255,145,90)',
                  margin: "auto",
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>{data1[0].value}</span>{data1[0].unit}<br/>
                {data1[0].key}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  boxSizing: 'border-box',
                  width: 160,
                  height: 80,
                  background: 'rgb(120,150,252)',
                  margin: "auto",
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>{data1[1].value}</span>{data1[1].unit}<br/>
                {data1[1].key}
              </div>
            </div>
          </Card>
        </Col>
        <Col span={15}>
          <Card title="公路资产组成统计" hoverable>
            <Chart height={220} autoFit data={data2}>
              <Interval position="genre*sold"
                        color={['genre', ['rgb(96,147,246)', 'rgb(94,219,173)', 'rgb(100,119,151)', 'rgb(247,193,55)', 'rgb(117,98,246)', 'rgb(113,203,236)']]}/>
              <Legend position={"top"}/>
              <Axis title/>
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={11}>
          <Card title="公路资产组成资金占比统计" hoverable extra="2021年度">
            <Chart height={250} data={data3} scale={cols} autoFit
                   onGetG2Instance={(c: any) => {
                     console.log(c.getXY(data3[0]))
                   }}
            >
              <Coordinate type="theta" radius={0.75}/>
              <Tooltip showTitle={false}/>
              <Legend position={"right"}/>
              <Axis visible={false}/>
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                label={['count', {
                  // label 太长自动截断
                  layout: {type: 'limit-in-plot', cfg: {action: 'ellipsis'}},
                  content: (data) => {
                    return `${data.item}: ${data.percent * 100}%`;
                  },
                }]}
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
        <Col span={13}>
          <Card title="公路资产组成情况统计" hoverable style={{height: 336}} extra="2021年度">
            <div style={{display: "flex", justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 24}}>
              <div
                style={{
                  boxSizing: 'border-box',
                  width: 180,
                  height: 80,
                  background: 'rgb(255,148,148)',
                  margin: "auto",
                  marginBottom: 20,
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>19002</span><br/>
                路基（米）
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  width: 180,
                  height: 80,
                  background: 'rgb(122,149,252)',
                  margin: "auto",
                  marginBottom: 20,
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>15290</span><br/>
                路面（米）
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  width: 180,
                  height: 80,
                  background: 'rgb(204,153,252)',
                  margin: "auto",
                  marginBottom: 20,
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>3057797.38</span><br/>
                桥梁（平米）
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  width: 180,
                  height: 80,
                  background: 'rgb(255,174,89)',
                  margin: "auto",
                  marginBottom: 20,
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>2462.466</span><br/>
                绿化（公里）
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  width: 180,
                  height: 80,
                  background: 'rgb(97,194,129)',
                  margin: "auto",
                  marginBottom: 20,
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>0</span><br/>
                隧道（个）
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  width: 180,
                  height: 80,
                  background: 'rgb(84,149,237)',
                  margin: "auto",
                  marginBottom: 20,
                  borderRadius: 5,
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 10
                }}>
                <span style={{color: '#fff', fontSize: 24}}>0</span><br/>
                涵洞（个）
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={24}>
          <Card title="分区公路资产价值组成统计" hoverable
                extra={<DatePicker onChange={()=>onChange}/>}>
            <Chart height={200} padding="auto" data={data5} scale={{
              name: {}
            }} autoFit>
              <Interval
                adjust={[
                  {
                    type: 'stack',
                  },
                ]}
                color={['type', ['rgb(88,141,246)', 'rgb(86,217,168)', 'rgb(92,112,145)', 'rgb(247,190,44)', 'rgb(110,90,245)', 'rgb(106,200,235)']]}
                position={position}
              />
              <Tooltip shared/>
              <Legend position={"top"}/>
            </Chart>
          </Card>
        </Col>
      </Row>
      <Row gutter={14} style={{marginTop: 14}}>
        <Col span={24}>
          <Card title="技术等级公路资产价值统计" hoverable
                extra={<DatePicker/>}>
            <Chart height={200} padding="auto" data={data6} autoFit>
              <Interval
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 0,
                  },
                ]}
                color="name"
                position="地区*数据"
              />
              <Tooltip shared/>
              <Legend position={"top"}/>
            </Chart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

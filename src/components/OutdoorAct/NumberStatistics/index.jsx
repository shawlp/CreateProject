import React, { Component } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { observer } from 'mobx-react';

@observer
class NumberStatistics extends Component {
    constructor(props) {
        super(props);
    }
    jsNum(num) {
        let lenWindow = document.documentElement.clientWidth;
        let iWidth = lenWindow / 12;
        let fs = num / 320 * iWidth;
        return fs;
    }  
    getOption(data) {
        let {seriesData, xAxisData} = data;

        let data1 = seriesData[0].data,
            data2 = seriesData[1].data,
            data3 = seriesData[2].data,
            name1 = seriesData[0].name,
            name2 = seriesData[1].name,
            name3 = seriesData[2].name,
            stack = seriesData[2].stack;

        let option = {
            tooltip : {
                show: false
            },
            legend: {
                data:[{
                    name: name1,
                    textStyle: {
                        color: '#999999',
                        fontSize: this.jsNum(36),
                        fontWeight: 400,
                    }
                },{
                   name: name2,
                    textStyle: {
                        color: '#999999',
                        fontSize: this.jsNum(36),
                        fontWeight: 400,
                    }            
                }],
                itemWidth: this.jsNum(50),
                itemHeight: this.jsNum(20),
                itemGap: this.jsNum(60),
                align: 'right',
                bottom: 0
            },
            hoverAnimation: false,
            animationDuration: 2000,  
            grid: {
                left: '0%',
                right: '0%',
                top: '2%',
                // bottom: '2%',
                containLabel: true,
            },
            xAxis : [
                {
                    type : 'category',
                    data : xAxisData,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: this.jsNum(13),
                        fontSize: this.jsNum(36),
                        color: '#FFFFFF',
                        fontWeight: 400
                    },
                    axisLine: {
                        lineStyle: {
                            width: this.jsNum(3),
                            color: '#848D95',
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    interval: 5,
                    max: 20,
                    axisLabel: {
                        margin: this.jsNum(20),
                        fontSize: this.jsNum(36),
                        color: '#FFFFFF',
                        fontWeight: 400
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: '#151A29'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: '#2C313F',
                            width: this.jsNum(2)
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    },
                }
            ],
            series : [
                {
                    name: name1,
                    type: 'bar',
                    stack: stack,
                    data: data1,
                    barWidth: this.jsNum(50),
                    itemStyle: {
                        color: '#00FFFF'
                    }
                },
                {
                    name: name2,
                    type: 'bar',
                    stack: stack,
                    data: data2,
                    barWidth: this.jsNum(50),
                    itemStyle: {
                        color: '#5994FF'
                    }
                },
                {
                    name: name3,
                    type: 'bar',
                    stack: stack,
                    data: data3,
                    label: {
                        normal: {
                            show: true,
                            position: 'insideBottom',
                            formatter:'{c}人',
                            textStyle: { 
                                fontSize: this.jsNum(30),
                                color: '#999999',
                                fontWeight: 400
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'rgba(128, 128, 128, 0)'
                        }
                    }
        
                },        
            ]
        };
        return option;
    } 
    componentWillReceiveProps(nextProps) {
        if (nextProps.activeIndex !== this.props.activeIndex && nextProps.activeIndex === 1) {
            this.startAni();
        }  
    }
    componentDidMount(){
        this.startAni();
      }
    startAni() {
        this.charts.getEchartsInstance().clear();
  
        let { barData } = this.props;
        let option = this.getOption(barData);
  
        setTimeout(() => {
            this.charts.getEchartsInstance().setOption(option, true); 
        }, 200); 
      }     
    render() {
        let { barData } = this.props;
        return <div className="number-statistic">
            <div className="number-statistic-title">区域人数统计</div>
            <div className="echart-wrapper"> 
                <ReactEcharts
                    option={this.getOption(barData)}
                    ref={(e) => { this.charts = e }}
                    style={{ height: '100%', width: '100%' }}
                    className='statistic-chart'
                    echarts={echarts} 
                />
            </div>
        </div>
    }
}

export default NumberStatistics;
import React, { Component } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

export default class LeaveConditionBar extends Component {
    jsNum(num) {
        let lenWindow = document.documentElement.clientWidth;
        let iWidth = lenWindow / 12;
        let fs = num / 320 * iWidth;
        return fs;
    }
    getOption(yAxisData, seriesData) {
        let option = {
            tooltip: {
                show: false
            },
            grid: {
                left: '1%',  
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
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
                }
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                axisLabel: {
                    show: true,
                    interval: 0,
                    rotate: 0,
                    margin: this.jsNum(20),
                    textStyle: {
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: this.jsNum(24)
                    },
                    axisLine: {
                        lineStyle: {
                            width: this.jsNum(2),
                            color: '#838D95',
                        }
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: '#848D95',
                    }
                }
            },
            series: [{
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}%',
                        color: '#999999',
                        position: 'right',
                        fontWeight: '400',
                        fontSize: this.jsNum(24)                
                    }
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                           [
                            {offset: 0, color: '#5994FF'},
                            {offset: 1, color: '#00FFFF'}
                           ]
                      )
                },
                barWidth: this.jsNum(40), 
                data: seriesData
            }]            
        };
        return option;
    }
    componentDidMount(){
        this.charts.getEchartsInstance().clear();

        let { yAxisData, seriesData } = this.props;
        let option = this.getOption(yAxisData, seriesData);

        setTimeout(() => {
            this.charts.getEchartsInstance().setOption(option, true); 
        }, 200); 
    }
    render() {
        let { chartTitle, yAxisData, seriesData } = this.props;
        return <div className="leave-chart-content">
            <div className="leave-chart-title">{chartTitle}</div>
            <div className="echart-wrapper">
                <ReactEcharts
                    option={this.getOption(yAxisData, seriesData)}  
                    ref={(e) => { this.charts = e }}
                    style={{ height: '100%', width: '100%' }}
                    className='leave-chart'
                    echarts={echarts}
                />
            </div>
        </div>;         
    }            
}
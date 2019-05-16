import React, { Component } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import './index.less';  

export default class ConditionBar extends Component {
    constructor(props) {
        super(props);
    }
    jsNum(num) {
        let lenWindow = document.documentElement.clientWidth;
        let iWidth = lenWindow / 12;
        let fs = num / 320 * iWidth;
        return fs;
    }  
    getOption(value, isShowLabel, titleText, labelText) {
        let option = {
            title: {
                show: !isShowLabel,
                text: `${value}%${titleText}`,
                x: 'center',
                y: 'center', 
                textStyle: {
                  fontWeight: 'normal',
                  color: '#13D3E0',
                  fontSize: this.jsNum(30),
                  fontWeight: 'bold' 
                }
            },
            tooltip: {
                show: false
            },
            legend: {
                show: false
            },
            series: [{
                name: '',
                type: 'pie',
                radius: ['85%', '100%'],
                clockWise: false, // 是否顺时针
                animation: true,  
                hoverAnimation: false,
                animationDuration: 3000,  
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: value,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: this.props.color,
                        }
                    },
                    label: {
                        normal: {
                            show: isShowLabel,
                            position: 'center',
                            formatter: labelText ? `${value}%${labelText[0]}` : null,
                            textStyle: {
                                fontSize: this.jsNum(30),
                                color: '#FFFFFF'
                            } 
                        },
                    }
                }, {
                    value: 100 - value,
                    name: '',   
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#121D33',
                        }
                    },
                    label: { 
                        normal: {
                            show: isShowLabel,  
                            position: 'center',
                            formatter: labelText ? `${100 - value}%${labelText[1]}` : null,
                            textStyle: {
                                fontSize: this.jsNum(30), 
                                color: '#FFFFFF' 
                            }   
                        }, 
                    }
                }]
            }]
        };
        return option;
    }
    componentDidMount(){
        this.charts.getEchartsInstance().clear();

        let { chartTitle, color, data, isShowLabel, labelText, titleText } = this.props;
        let option = this.getOption(data, isShowLabel, titleText, labelText);

        setTimeout(() => {
            this.charts.getEchartsInstance().setOption(option, true); 
        }, 200); 
    }    
    render() { 
        let { chartTitle, color, data, isShowLabel, labelText, titleText } = this.props;
        return <div className="condition-chart-content">
            <div className="condition-chart-title" style={{color}}>{chartTitle}</div>
            <div className="echart-wrapper">
                <ReactEcharts
                    option={this.getOption(data, isShowLabel, titleText, labelText)}  
                    ref={(e) => { this.charts = e }}
                    style={{ height: '100%', width: '100%' }}
                    className='condition-chart'
                    echarts={echarts}
                />
            </div>
        </div>; 
    }    
}
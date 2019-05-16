
import React, { Component, createRef } from "react";
import ReactEcharts from 'echarts-for-react';
import {Tool,Het} from 'exhibition-tool';

const getOption = (value) => {
    const option =
    {
        grid: {
            top: 0,
        },
        title: {
            text: `23%`,
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#FFFFFF',
                fontSize: Tool.jsNum(18)
            }
        },
        tooltip: {
            show: false,
        },
        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: false,
            radius: ['85%', '100%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            animationDuration: 3000,
            data: [{
                value: value,
                name: '01',
                itemStyle: {
                    normal: {
                        color: '#13D3E0',
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        show: false
                    }
                }
            }, {
                value: 100 - value,
                name: 'invisible',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#121D33',
                    }
                },
            }]
        }
        ]
    };
    return option;
}
const ChartsByLikes = (props) => {
    return <ReactEcharts option={getOption(props.value)} style={{ height: `${Tool.jsNum(80)}px`, width: '100%' }} />
}
export default ChartsByLikes;
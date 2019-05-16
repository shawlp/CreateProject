
import React, { Component, createRef } from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import {Tool,Het} from 'exhibition-tool';

function getOption(value,labels){
    return {
        grid:{
            top:0,
        },
        xAxis:  {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#999',
                }
            },
            nameTextStyle:{
                color:'#999',
                fontWeight:'400',
                fontSize:Tool.jsNum(15)
            },
            
            axisLabel:{
                color:'#999',
                fontWeight:'400',
                margin:Tool.jsNum(8),
                fontSize:Tool.jsNum(15)
            },
            data: labels
        },
        yAxis:{
            show:true,
            splitNumber:3,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel : {
                show: false
            },
            splitLine:{
                lineStyle:{
                    color:'#666',
                    type:'dashed'
                }
            }
        },
        color:['#13D3E0','#5994FF'],
        series: [
            {
                name: 'name',
                type: 'bar',
                barWidth:Tool.jsNum(25),
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        fontSize:Tool.jsNum(12),
                        formatter: '{c}\n秒'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#00FFFF'},
                                {offset: 1, color: '#5994FF'}
                            ]
                        )
                    }
                },
                data: value
            }
        ]
    };
}

const ChartsByTime = (props)=>{
    const {value,labels} = props;
    return <ReactEcharts option={getOption(value,labels)} style={{height: `${Tool.jsNum(240)}px`, width: '100%'}} />
}
export default ChartsByTime;
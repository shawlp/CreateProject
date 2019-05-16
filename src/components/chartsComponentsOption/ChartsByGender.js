
import React, { Component, createRef } from "react";
import ReactEcharts from 'echarts-for-react';
import {Tool,Het} from 'exhibition-tool'; 

function getOption(value,value2,labels){
    return {
        grid:{
            top:0,
            bottom:Tool.jsNum(80)
        },
        legend:{
            show:true,
            bottom:0,
            itemWidth:Tool.jsNum(15),
            itenHeight:Tool.jsNum(15),
            borderRadius:Tool.jsNum(8),
            textStyle:{
                color:'#999',
                fontSize:Tool.jsNum(15)
            }
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
                name: '女性',
                type: 'bar',
                barWidth:Tool.jsNum(25),
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        fontSize:Tool.jsNum(12),
                        formatter: '{c}\n人'
                    }
                },
                data: value
            },
            {
                name: '男性',
                type: 'bar',
                barWidth:Tool.jsNum(25),
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        fontSize:Tool.jsNum(12),
                        formatter: '{c}\n人'
                    }
                },
                data: value2
            }
        ]
    };
}
 
const ChartsByGender = (props)=>{
    const {femaleValue,manValue,labels} =props;
    return <ReactEcharts option={getOption(femaleValue,manValue,labels)} style={{height: `${Tool.jsNum(240)}px`, width: '100%'}} />
}
export default ChartsByGender;
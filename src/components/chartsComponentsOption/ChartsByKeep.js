
import React, { Component, createRef } from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import {Tool,Het} from 'exhibition-tool';

function getOption(value,labels){
    const color = ['#FF8549','#FFCA63','#3EB27E','#AADB9B','#5181E4']
    let series = value.map((value,i)=>{
        return {
            name:'数据',
            type:'pie',
            radius: [`${i*(100/labels.length)+5}%`, `${(i+1)*(100/labels.length)}%`],

            label: {
                show:false,
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:value, name:labels[i],itemStyle:{color:color[i]}},
                {value:100-value, name:`labels[i]流转率`,itemStyle:{color:'transparent'}}
            ]
        }
    })
    return {
        grid:{
            top:0,
            left:'0%'
        },
    
        legend: {
            x : 'right',
            y : 'center',
            orient:'vertical',
            textStyle:{
                color:'#fff',
                fontSize:Tool.jsNum(15)
            },
            data:labels
        },

        series: series
    };
}
 

const ChartsByKeep = (props)=>{
    let {value,labels} = props;
    return <ReactEcharts option={getOption(value,labels)} style={{height: `${Tool.jsNum(240)}px`, width: '100%'}} />
}
export default ChartsByKeep;
import React, { Component } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import './index.less';  

export default class StatisticBar extends Component {
    constructor(props) {
        super(props);
    }
    jsNum(num) {
        let lenWindow = document.documentElement.clientWidth;
        let iWidth = lenWindow / 12;
        let fs = num / 320 * iWidth;
        return fs;
    }  
    getOption(value) { 
        let option = {
            title: {
              text: `${value}%`,
              x: 'center',
              y: 'center',
              textStyle: {
                fontWeight: 'normal',
                color: '#FFFFFF',
                fontSize: this.jsNum(30)
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
                value: 100-value,
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
        let { barTitle, barData, barIntro } = this.props;
        return <div className="statistic-bar-content">
            <div className="statistic-bar-title">{barTitle}</div>
            <div className="echart-wrapper">
                <ReactEcharts
                    option={this.getOption(barData)}
                    ref={(e) => { this.charts = e }}
                    style={{ height: '100%', width: '100%' }}
                    className='statistic-chart'
                    echarts={echarts}
                />
            </div>
            <p className="statistic-bar-intro">
                {barIntro}
            </p>
        </div>;
    }    
}
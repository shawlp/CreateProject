import React, { Component } from "react";
import Swiper from 'swiper';
import '@/static/swiper.css';

class Meal extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let { container } = this.props;
        let mySwiper = new Swiper(`.${container}`, {
            slidesPerView: 4, // 设置slider容器能够同时显示的slides数量  
            spaceBetween: 15, // slider之间的间距为15，slide会等分距离
            observer: true,
            observeParents: true, 
            loop: false,                      
        });    
    }
    render() { 
        let { container } = this.props; 
        let {mealTitle, mealList} = this.props.mealData;

        return ( 
            <div className="meal-wrapper">
                <div className="meal-title">{mealTitle}</div>
                    <div className="meal-list">
                        <div className={"swiper-container " + container}>
                            <div className="swiper-wrapper">
                                { 
                                    mealList.map((item, index) => { 
                                        return <div className="swiper-slide meal-item" key={"meal-item"+index}>
                                            <div className="meal-item-pic" style={{backgroundImage: `url(${'static/lunch/'+item.mealUrl})`}}></div> 
                                            <div className="meal-item-intro">{item.mealName}</div> 
                                        </div> 
                                    })
                                }
                            </div>
                        </div> 
                    </div> 
            </div> 
        )
    }
}   
export default Meal;
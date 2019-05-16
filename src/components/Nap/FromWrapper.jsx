import React, { Component } from 'react';
import Horn from '../../common/Horn/index.jsx';
import CenterHighLight from '../../common/CenterHighLight/index.jsx';
import Form from '../../common/Form/index.jsx';
import TabBar from '../../common/TabBar/index.jsx';
import { observer, inject } from 'mobx-react';
import Swiper from 'swiper';
import '@/static/swiper.css';

let swiperTimer = null;

@observer
class FormWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }
    componentDidMount() {
        let _this = this;
        this.mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            on: {
                slideChangeTransitionEnd: function(){
                    _this.handleChangeTab(this.activeIndex);
                },    
            }, 
        });            
    }
    handleSlide(index) {
        swiperTimer && clearTimeout(swiperTimer);
        swiperTimer = setTimeout(()=>{
            this.mySwiper.slideTo(index, 200);
        },200);  
    } 
    handleChangeTab(i) {
        this.setState({
            activeIndex: i
        }, () => {
            this.handleSlide(i);
        }); 
    }       
    render() { 
        let {studentFormData, environmentFormData, menuItems } = this.props;

        let {activeIndex} = this.state; 

        return <div className="form-wrapper"> 
            <CenterHighLight />
            <Horn />
            <TabBar menuItems={menuItems} activeIndex={activeIndex} handleChangeTab={this.handleChangeTab}/>
            <div className="swiper-container formContainer-wrapper"> 
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="form-scroll">   
                            <Form formData={studentFormData} />
                        </div> 
                    </div>
                    <div className="swiper-slide">
                        <div className="form-scroll">   
                            <Form formData={environmentFormData} />
                        </div> 
                    </div>
                </div>
            </div>                         
        </div>;    
    }    
}

export default FormWrapper;
import React, { Component, Fragment } from 'react';
import './index.less';
import { observer, inject, trackComponents } from 'mobx-react';

@inject('DiningStore')
@observer
class Form extends Component {
    constructor(props) {
        super(props);
        this.handleToast = this.handleToast.bind(this);
    }
    handleToast() {
        let { handleToastAction } = this.props.DiningStore;
        handleToastAction(true, '开发中，敬请期待！', 0)
    }
    render() { 
        let { formData } = this.props;
        return (   
            <Fragment>
                <table className="tip-form-content">
                    <tbody>
                        { 
                            formData.map((item, index) => {
                                let date = item.date;
                                let length = item.recipeList.length;
                                let recipeFirst = item.recipeList.shift();
                                let { mealName, mealList, prepare, arrangement } = recipeFirst;
                                return <Fragment key={'item'+index}>
                                         <tr>     
                                            <td rowspan={length} className="rowspan">
                                                <span>{date}</span>
                                            </td>  
                                            <td>{mealName}</td>
                                            <td className="width400">
                                                <span>{mealList}</span>  
                                            </td>
                                            <td className="line" onClick={this.handleToast}>{prepare}</td>
                                            <td className="line" onClick={this.handleToast}>{arrangement}</td>
                                        </tr> 
                                        {
                                            item.recipeList.map((item, index) => {
                                                return  <tr key={"tr-"+index}>   
                                                    <td>{item.mealName}</td>
                                                    <td className="width400">{item.mealList}</td>
                                                    <td className="line" onClick={this.handleToast}>{item.prepare}</td>
                                                    <td className="line" onClick={this.handleToast}>{item.arrangement}</td> 
                                                </tr> 
                                            })
                                        }
                                </Fragment>
                            })
                        } 
                    </tbody>           
                </table>
            </Fragment>  
        );
    }
} 

export default Form;
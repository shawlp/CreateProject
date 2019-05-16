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
        const { tHead, tData } = formData;
        return (  
            <Fragment>
                <table className="form-table-head">
                    <thead> 
                        <tr>
                            {
                                tHead.map((item, index) => {
                                    if (index === 3) {
                                        return <th className="width600" key={"th-"+index}>{item}</th>   
                                    } 
                                    if (index === 0) {
                                        return <th className="width260" key={"th-"+index}>{item}</th>   
                                    }  
                                    return <th key={"th-"+index}>{item}</th>    
                                }) 
                            }
                        </tr>
                    </thead>
                </table>
                <div className="dining-form-content">
                    <table className="form-content">
                        <tbody style={{backgroundColor: '#07122B'}}> 
                            {
                                tData.map((item, index) => {
                                    let date = item.date;
                                    let length = item.recipeList.length;
                                    let recipeFirst = item.recipeList.shift();
                                    let { recipeNum, recipeName, foodWeight, recipeReserve, processing } = recipeFirst;
                                    return <Fragment key={'item'+index}>
                                            <tr>    
                                                <td rowspan={length} className="rowspan">
                                                    <span>{date}</span>
                                                </td>  
                                                <td>{recipeNum}</td>
                                                <td>{recipeName}</td>
                                                <td className="width600">{foodWeight}</td>
                                                <td>{recipeReserve}</td>
                                                <td className="underline" onClick={this.handleToast}>{processing}</td> 
                                            </tr>
                                            { 
                                                item.recipeList.map((item, index) => {
                                                    return  <tr key={"tr-"+index}>   
                                                        <td>{item.recipeNum}</td>
                                                        <td>{item.recipeName}</td>
                                                        <td className="width600">{item.foodWeight}</td>
                                                        <td>{item.recipeReserve}</td> 
                                                        <td className="underline" onClick={this.handleToast}>{item.processing}</td> 
                                                    </tr>
                                                }) 
                                            }
                                    </Fragment>
                                })
                            } 
                        </tbody>           
                    </table>
                </div>  
            </Fragment>  
        );
    }
} 

export default Form;
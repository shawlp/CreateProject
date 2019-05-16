import React, { Component, Fragment } from 'react';
import './index.less';
import { observer, inject } from 'mobx-react';

@inject('LeaveParkStore')
@observer
class Form extends Component {
    constructor(props) {
        super(props);
        this.handleToast = this.handleToast.bind(this);
    }
    handleToast() { 
        let { handleToastAction } = this.props.LeaveParkStore;
        handleToastAction(true, '开发中，敬请期待！');
    } 
    render() {  
        let { formData } = this.props;
        const { tHead, tData } = formData;
        return (  
            <Fragment> 
                <table className="form-table-head">
                    <thead style={{backgroundColor: '#09193F'}}>   
                        <tr>
                            {
                                tHead.map((item, index) => {
                                    return <th key={"th-"+index}>{item}</th>    
                                }) 
                            }
                        </tr>
                    </thead>  
                </table>  
                <div className="leavePark-form-content">
                    <table className="form-content form-table-body">  
                        <tbody style={{backgroundColor: '#07122B'}}>  
                            {   
                                tData.map((item, index) => {
                                    return <tr key={"tr-"+index} style={{background: `${index === 1 ? 'rgb(57, 24, 50)' : '#09193F'}`}}>   
                                        <td>{item.param1}</td> 
                                        <td>{item.param2}</td>
                                        <td>{item.param3}</td>
                                        <td>{item.param4}</td>
                                        <td style={{ color: `${index === 1 ? '#FF3E83' : '#999999'}`}}>{item.param5}</td>  
                                        <td style={{ color: `${index === 1 ? '#FF3E83' : '#999999'}`, textDecoration: `${index === 1 ? 'underline' : 'none'}`}} onClick={this.handleToast}>{item.param6}</td>  
                                    </tr> 
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
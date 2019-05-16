import React, { Component, Fragment } from 'react';
import './index.less';
import { observer, inject } from 'mobx-react';

@observer
class Form extends Component {
    constructor(props) {
        super(props);
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
                                    return <th key={"th-"+index}>{item}</th>    
                                }) 
                            }
                        </tr>
                    </thead>  
                </table> 
                <div className="outdoor-form-content">
                    <table className="form-content form-table-body">  
                        <tbody> 
                            {   
                                tData.map((item, index) => {
                                    // 是否异常
                                    let param8 = item.param8;

                                    return <tr key={"tr-"+index} style={{background: `${item.isAbnormalFlag && param8 && param8 !== '无' ? '#FF3E83' : '#09193F'}`}}>  
                                        <th>{item.param1}</th> 
                                        <th>{item.param2}</th>
                                        <th>{item.param3}</th>
                                        <th>{item.param4}</th>
                                        <th>{item.param5}</th>
                                        <th>{item.param6}</th> 
                                        {
                                            item.param7 ? <th>{item.param7}</th> : null
                                        }
                                        { 
                                            item.param8 ? <th>{item.param8}</th> : null
                                        }
                                        {
                                            item.param9 ? <th>{item.param9}</th> : null
                                        }
                                        {
                                            item.param10 ? <th>{item.param10}</th> : null
                                        } 
                                        {
                                            item.param11 ? <th>{item.param11}</th> : null
                                        } 
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
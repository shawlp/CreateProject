import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';

@observer
class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let toast = this.props.toast;
        let { toastContent, isToastShow, toastType } = toast;
        return (
            <Fragment>
                {
                    isToastShow ? 
                    <div className={"toast" + (toastType === 0 ? ' small' : '')}>
                        {
                            toastType === 0 ? null : <div className="toast-spin" ></div>
                        }
                        <p className="toast-content">{toastContent}</p>
                    </div> : null
                }
            </Fragment>
        )
    }
}  

export default Toast; 
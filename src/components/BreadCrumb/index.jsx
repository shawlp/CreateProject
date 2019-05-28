import React, { Component, Fragment } from 'react';
import {Breadcrumb} from 'antd';

export default class BreadCrumb extends Component {
    render() {
        let {items = []} = this.props;
        const BreadcrumbItem = items.map((item, index) => {
            return <Breadcrumb.Item key={item}>
                {item}
            </Breadcrumb.Item>
        });
        return (<Breadcrumb style={{ margin: '16px 0' }}> 
            {BreadcrumbItem}
        </Breadcrumb>)
    }
}
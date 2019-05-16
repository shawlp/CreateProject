import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropertyMark from './PropertyMark/index';

@observer
class PropertyMarkContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="property-mark-content">
            <PropertyMark />
        </div>
    }
}

export default PropertyMarkContent;
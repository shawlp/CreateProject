/**
 * @param Horn: 所有边框的四个角, 抽成组件来用
 * @param Tips: 只需要父盒子有宽高且position: relative/absolute
 */
import React, { Fragment } from "react";
import './index.less';

const Horn = () => {
    return (
        <Fragment>
            <i className="horn horn-lt"></i>
            <i className="horn horn-lb"></i>
            <i className="horn horn-rt"></i>
            <i className="horn horn-rb"></i>
        </Fragment>
    )
}
export default Horn
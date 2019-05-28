import React, { PureComponent, Fragment } from 'react';
import { Menu, Icon} from 'antd';
import style from './index.less';
import { createHashHistory } from 'history';

const SubMenu = Menu.SubMenu;

export default class SiderBar extends PureComponent {
    constructor(props) {
        super(props);
        let defaultVal = this.returnDefultKey();
        this.state = {
            theme: 'dark',
            current: this.props.location.pathname,
            defaultOpenKeys:defaultVal.defaultOpenKeys,
            defaultSelectedKeys:defaultVal.defaultSelectedKeys            
        };
    }
    // static contextTypes = {
    //     router: PropTypes.object.isRequired
    // }
    returnDefultKey(){
        let defaultOpenKeys = [];
        let defaultSelectedKeys = [];
        let pathname = this.props.location.pathname;
        let subMenus = this.props.allMenu.forEach((itemLevel1,i) => {
            let children = itemLevel1.children;
            if(children){
                children.forEach((itemLevel2,j) => {
                    if(pathname.indexOf(itemLevel2.url) !== -1){
                        defaultOpenKeys.push(`sub${i}`);
                        defaultSelectedKeys.push(`${itemLevel2.url}`);
                    }
                });
            }
        });
        return {defaultOpenKeys,defaultSelectedKeys};
    }
    handleClick = (e) => {
        createHashHistory().push({pathname:e.key});
        this.setState({
            current: e.key,
        });
    }
    render (){  
        let {defaultOpenKeys, defaultSelectedKeys} = this.state;
        let subMenus = this.props.allMenu.map((itemLevel1,i) => {
            let children = itemLevel1.children;
            let menuItems = [];
            if(children){
                menuItems = children.map((itemLevel2,j) => {
                    return (<Menu.Item key={`${itemLevel2.url}`}>{itemLevel2.name}</Menu.Item>);
                });
            }
            return (
                <SubMenu key={`sub${i}`} title={<span><Icon type={itemLevel1.icon} /><span>{itemLevel1.name}</span></span>}>
                    {menuItems}
                </SubMenu>
            )
        });
        return (
           <div className = {style.className}>
            <Menu
              theme={this.state.theme}
              defaultOpenKeys={defaultOpenKeys}
              defaultSelectedKeys={defaultSelectedKeys}
              onClick={this.handleClick}
              mode="inline"
            >
                {subMenus}
            </Menu>
          </div>
        );
    }
}

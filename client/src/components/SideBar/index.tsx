import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';

import {
  withRouter,
  Link,
  NavLink,
  RouteComponentProps,
} from 'react-router-dom';

import { PAGE_PATHS, STORES } from '~constants';

const logo = require('../../assets/logo.png');

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface MenuFilterProps extends RouteComponentProps {
  selectedKeys: string;
  openKeys: string;
  collapsed: string;
}

class SideBar extends Component<MenuFilterProps> {
  constructor(props: any) {
    super(props);

    var collapsed = this.props.collapsed === 'true';

    this.state = {
      collapsed: collapsed,
      selectedKeys: this.props.selectedKeys,
      openKeys: this.props.openKeys,
    };
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <>
        <Sider
          collapsible
          collapsed={this.state['collapsed']}
          onCollapse={this.onCollapse}
        >
          <div className="logo" style={{ textAlign: 'center', margin: 5 }}>
            <a href="/">
              <img src={logo} style={{ width: '90%' }} />
            </a>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed={this.state['collapsed']}
            defaultSelectedKeys={[this.state['selectedKeys']]}
            defaultOpenKeys={[this.state['openKeys']]}
          >
            <SubMenu
              key="node"
              title={
                <span>
                  <Icon type="apple" style={{ verticalAlign: 'middle' }} />
                  <span style={{ fontSize: 16, verticalAlign: 'middle' }}>
                    신규수집기
                  </span>
                </span>
              }
            >
              <Menu.Item key="nodeStatus">
                <Link
                  key="nodeStatus"
                  to={`${PAGE_PATHS.NODE}/nodeStatus/${this.state['collapsed']}`}
                >
                  현황
                </Link>
              </Menu.Item>
              <Menu.Item key="nodeMonitoring">
                <Link
                  key="nodeMonitoring"
                  to={`${PAGE_PATHS.NODE}/nodeMonitoring/${this.state['collapsed']}`}
                >
                  모니터링
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="dmap"
              title={
                <span>
                  <Icon type="android" style={{ verticalAlign: 'middle' }} />
                  <span style={{ fontSize: 16, verticalAlign: 'middle' }}>
                    디맵수집기
                  </span>
                </span>
              }
            >
              <Menu.Item key="dmapStatus">
                <Link
                  key="dmapStatus"
                  to={`${PAGE_PATHS.DMAP}/dmapStatus/${this.state['collapsed']}`}
                >
                  현황
                </Link>
              </Menu.Item>
              <Menu.Item key="dmapMonitoring">
                <Link
                  key="dmapMonitoring"
                  to={`${PAGE_PATHS.DMAP}/dmapMonitoring/${this.state['collapsed']}`}
                >
                  모니터링
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="count">
              <Icon type="appstore" style={{ verticalAlign: 'middle' }} />
              <span style={{ fontSize: 16, verticalAlign: 'middle' }}>
                수집건수
              </span>
              <Link
                to={`${PAGE_PATHS.COUNT}/${this.state['collapsed']}`}
                style={{ color: '#969DA5' }}
              />
            </Menu.Item>
            <Menu.Item key="always">
              <Icon type="wifi" style={{ verticalAlign: 'middle' }} />
              <span style={{ fontSize: 16, verticalAlign: 'middle' }}>
                상시수집
              </span>
              <Link
                to={`${PAGE_PATHS.DATA}/always/${this.state['collapsed']}`}
                style={{ color: '#969DA5' }}
              />
            </Menu.Item>
            <Menu.Item key="retroactive">
              <Icon type="api" style={{ verticalAlign: 'middle' }} />
              <span style={{ fontSize: 16, verticalAlign: 'middle' }}>
                소급수집
              </span>
              <Link
                to={`${PAGE_PATHS.DATA}/retroactive/${this.state['collapsed']}`}
                style={{ color: '#969DA5' }}
              />
            </Menu.Item>
          </Menu>
        </Sider>
      </>
    );
  }
}

export default withRouter(SideBar);

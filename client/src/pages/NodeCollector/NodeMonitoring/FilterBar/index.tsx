import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './node_modules/antd/dist/antd.css';

export const StatusFilter = ({ filterBy, ...props }) => {
  const onClick = ({ key }) => {
    filterBy(key);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Status: 대기</Menu.Item>
      <Menu.Item key="2">Status: 진행</Menu.Item>
      <Menu.Item key="3">Status: 완료</Menu.Item>
      <Menu.Item key="4">Status: 취소</Menu.Item>
      <Menu.Item key="5">Status: 에러</Menu.Item>
      <Menu.Item key="6">Status: 테스트</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="7">Clear Filter</Menu.Item>
    </Menu>
  );

  return (
    <div {...props} style={{ float: 'left' }}>
      <Dropdown className="filter" overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          Filter By <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};

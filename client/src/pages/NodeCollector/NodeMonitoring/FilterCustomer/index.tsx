import React from 'react';
import { Menu, Dropdown, Icon, Divider, Select, Avatar, Input } from 'antd';
import 'antd/dist/antd.css';

export const FilterCustomer = ({ filterBy, customers, ...props }) => {
  const onClick = value => {
    filterBy(value);
  };

  // const menu = (
  //   <Menu onClick={onClick}>
  //     {Array.from(customers).map(customer => (
  //       <Menu.Item key={customer['name']}>{customer['name']}</Menu.Item>
  //     ))}

  //     <Menu.Divider />
  //     <Menu.Item key="7">Clear Filter</Menu.Item>
  //   </Menu>
  // );

  return (
    <>
      <Input.Group compact>
        <Avatar
          shape="square"
          size="large"
          style={{
            color: '#353A40',
            fontSize: 15,
            width: 65,
          }}
        >
          고객명
        </Avatar>
        <Select
          id="customer"
          size="large"
          style={{ width: '230px', marginRight: '40px' }}
          onChange={onClick}
        >
          <Select.Option key="customer_id" value="all">
            전체
          </Select.Option>

          {customers.map(customer => (
            <Select.Option key="customer_id" value={customer['name']}>
              {customer['name']}
            </Select.Option>
          ))}
        </Select>
      </Input.Group>
      {/* <Dropdown
        className="filter"
        overlay={menu}
        trigger={['click']}
        placement="bottomLeft"
      >
        <a className="ant-dropdown-link" href="#">
          Filter By Customer <Icon type="down" />
        </a>
      </Dropdown> */}
    </>
  );
};

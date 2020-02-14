import React from 'react';
import { Menu, Dropdown, Icon, Divider, Select, Avatar, Input } from 'antd';
import 'antd/dist/antd.css';

export const FilterCustomer = ({ filterBy, customers, ...props }) => {
  const onClick = value => {
    filterBy(value);
  };

  return (
    <>
      <Input.Group compact>
        <Avatar
          shape="square"
          size="large"
          style={{
            color: '#353A40',
            backgroundColor: '#fafafa',
            border: '1px solid #D9D9D9',
            fontSize: 15,
            width: 70,
            verticalAlign: 'middle',
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
    </>
  );
};

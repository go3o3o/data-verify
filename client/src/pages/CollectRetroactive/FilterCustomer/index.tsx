import React from 'react';
import { Select, Avatar, Input } from 'antd';
import 'antd/dist/antd.css';

export const FilterCustomer = ({ filterBy, data, customers, ...props }) => {
  const onClick = value => {
    filterBy('filterCustomer', 'customer_id', value, data);
  };
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
            <Select.Option key="customer_id" value={customer['customer_id']}>
              {customer['customer_id']}
            </Select.Option>
          ))}
        </Select>
      </Input.Group>
    </>
  );
};

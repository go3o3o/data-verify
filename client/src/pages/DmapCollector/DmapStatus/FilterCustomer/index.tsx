import React from 'react';
import { Select, Avatar, Input } from 'antd';

export const FilterCustomer = ({
  filterBy,
  customers,
  ...props
}: {
  filterBy: any;
  customers: any;
}) => {
  const onClick = (value: string) => {
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
          showSearch
          id="customer"
          size="large"
          style={{ width: '230px', marginRight: '40px' }}
          onChange={onClick}
        >
          <Select.Option key="customer_id" value="all">
            전체
          </Select.Option>
          {customers.map((customer: string) => (
            <Select.Option key="customer_id" value={customer['customer_id']}>
              {customer['customer_id']}
            </Select.Option>
          ))}
        </Select>
      </Input.Group>
    </>
  );
};

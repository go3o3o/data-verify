import React from 'react';
import { Select, Avatar, Input } from 'antd';

export const FilterCustomer = ({
  filterBy,
  data,
  customers,
  ...props
}: {
  filterBy: any;
  data: any;
  customers: any;
}) => {
  const onClick = (value:string) => {
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

          {customers.map((customer:object) => (
            <Select.Option key="customer_id" value={customer['customer_id']}>
              {customer['customer_id']}
            </Select.Option>
          ))}
        </Select>
      </Input.Group>
    </>
  );
};

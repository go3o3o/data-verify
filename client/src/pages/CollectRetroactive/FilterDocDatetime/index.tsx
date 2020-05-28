import React from 'react';
import { Select, Avatar, Input } from 'antd';

export const FilterDocDatetime = ({
  filterBy,
  data,
  ...props
}: {
  filterBy: any;
  data: any;
}) => {
  const onClick = (value: string) => {
    filterBy('filterDocDatetime', 'doc_datetime', value, data);
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
          수집일자
        </Avatar>
        <Select
          id="status"
          size="large"
          style={{ width: '230px', marginRight: '40px' }}
          onChange={onClick}
        >
          <Select.Option key="status" value="all">
            전체
          </Select.Option>
          <Select.Option key="status" value="CRS001">
            7일전
          </Select.Option>
          <Select.Option key="status" value="CRS002">
            6일전
          </Select.Option>
          <Select.Option key="status" value="CRS002">
            6일전
          </Select.Option>
          <Select.Option key="status" value="CRS002">
            6일전
          </Select.Option>
          <Select.Option key="status" value="CRS002">
            6일전
          </Select.Option>
          <Select.Option key="status" value="CRS002">
            6일전
          </Select.Option>
        </Select>
      </Input.Group>
    </>
  );
};

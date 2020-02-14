import React from 'react';
import { Select, Avatar, Input } from 'antd';
import 'antd/dist/antd.css';

export const FilterUseYn = ({ filterBy, ...props }) => {
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
          사용
        </Avatar>
        <Select
          id="use_yn"
          size="large"
          style={{
            width: '80px',
            marginRight: '40px',
            fontSize: 15,
          }}
          defaultValue="Y"
          onChange={onClick}
        >
          <Select.Option key="use_yn" value="all">
            전체
          </Select.Option>
          <Select.Option key="use_yn" value="Y">
            Y
          </Select.Option>
          <Select.Option key="use_yn" value="N">
            N
          </Select.Option>
        </Select>
      </Input.Group>
    </>
  );
};

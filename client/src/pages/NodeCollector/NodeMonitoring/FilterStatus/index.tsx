import React from 'react';
import {
  Menu,
  Dropdown,
  Icon,
  Select,
  Divider,
  Avatar,
  Input,
  Form,
} from 'antd';
import 'antd/dist/antd.css';

export const FilterStatus = ({ filterBy, ...props }) => {
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
            fontSize: 15,
            width: 65,
          }}
        >
          상태
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
            대기
          </Select.Option>
          <Select.Option key="status" value="CRS002">
            진행
          </Select.Option>
          <Select.Option key="status" value="CRS003">
            완료
          </Select.Option>
          <Select.Option key="status" value="CRS004">
            취소
          </Select.Option>
          <Select.Option key="status" value="CRS005">
            에러
          </Select.Option>
          <Select.Option key="status" value="CRS006">
            테스트
          </Select.Option>
        </Select>
      </Input.Group>
    </>
  );
};

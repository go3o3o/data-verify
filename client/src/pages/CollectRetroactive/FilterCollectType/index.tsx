import React from 'react';
import { Select, Avatar, Input } from 'antd';
import 'antd/dist/antd.css';

export const FilterCollectType = ({ filterBy, data, ...props }) => {
  const onClick = value => {
    filterBy('filterCollectType', 'collect_type_nm', value, data);
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
          수집방법
        </Avatar>
        <Select
          id="collect_type_nm"
          size="large"
          style={{ width: '230px', marginRight: '40px' }}
          onChange={onClick}
        >
          <Select.Option key="collect_type_nm" value="all">
            전체
          </Select.Option>
          <Select.Option key="collect_type_nm" value="디맵수집기">
            디맵수집기
          </Select.Option>
          <Select.Option key="collect_type_nm" value="신규수집기">
            신규수집기
          </Select.Option>
        </Select>
      </Input.Group>
    </>
  );
};

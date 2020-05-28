import React from 'react';
import { Select, Avatar, Input } from 'antd';

export const FilterCollectType = ({
  filterBy,
  data,
  ...props
}: {
  filterBy: any;
  data: any;
}) => {
  const onClick = (value: string) => {
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
            backgroundColor: '#fafafa',
            border: '1px solid #D9D9D9',
            fontSize: 15,
            width: 70,
            verticalAlign: 'middle',
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

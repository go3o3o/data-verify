import React from 'react';
import moment from 'moment';
import { Select, Avatar, Input } from 'antd';

export const FilterCollectDatetime = ({
  filterBy,
  data,
  ...props
}: {
  filterBy: any;
  data: any;
}) => {
  const onClick = (value: string) => {
    filterBy('filterCollectDatetime', 'collect_datetime', value, data);
  };

  const day_1 = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const day_2 = moment()
    .subtract(2, 'days')
    .format('YYYY-MM-DD');
  const day_3 = moment()
    .subtract(3, 'days')
    .format('YYYY-MM-DD');
  const day_4 = moment()
    .subtract(4, 'days')
    .format('YYYY-MM-DD');
  const day_5 = moment()
    .subtract(5, 'days')
    .format('YYYY-MM-DD');
  const day_6 = moment()
    .subtract(6, 'days')
    .format('YYYY-MM-DD');
  const day_7 = moment()
    .subtract(7, 'days')
    .format('YYYY-MM-DD');

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
          id="collect_datetime"
          size="large"
          style={{ width: '230px', marginRight: '40px' }}
          onChange={onClick}
        >
          <Select.Option key="collect_datetime" value="all">
            전체
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_7}>
            7일전
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_6}>
            6일전
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_5}>
            5일전
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_4}>
            4일전
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_3}>
            3일전
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_2}>
            2일전
          </Select.Option>
          <Select.Option key="collect_datetime" value={day_1}>
            1일전
          </Select.Option>
        </Select>
      </Input.Group>
    </>
  );
};

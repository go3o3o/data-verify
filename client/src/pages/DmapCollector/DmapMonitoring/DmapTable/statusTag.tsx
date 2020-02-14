import React from 'react';
import { Tag } from 'antd';
import 'antd/dist/antd.css';

const requestStateMap = {
  0: <Tag color="gold">대기</Tag>,
  2: <Tag color="#FFCC00">진행</Tag>,
  1: <Tag color="#12ABE2">완료</Tag>,
  3: <Tag color="#FF0202">IP 벤</Tag>,
  9: <Tag color="#FF0202">에러</Tag>,
};

// const requestUseYnMap = {};

export const StatusTag = ({ table, status }) => {
  if (table === 'progress') {
    return requestStateMap[status];
  }
  //   if (table === 'project') {
  //     return requestUseYnMap[status];
  //   }
};

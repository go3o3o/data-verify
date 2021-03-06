import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;

export const FilterSearch = ({ onSearch, ...props }) => (
  <>
    <Input.Group compact>
      <Search
        placeholder="Enter Project | Customer"
        size="large"
        onSearch={onSearch}
        style={{ width: 300 }}
      />
    </Input.Group>
  </>
);

import React from "react";
import { Input } from "antd";

const Search = Input.Search;

export const FilterSearch = ({ onSearch, ...props }) => (
  <>
    <Input.Group compact>
      <Search
        placeholder="Enter Channel"
        onSearch={onSearch}
        style={{ width: 200}}
      />
    </Input.Group>
  </>
);

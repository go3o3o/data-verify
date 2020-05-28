import React from "react";
import { Select, Avatar, Input } from "antd";

export const FilterCollectType = ({ filterBy, ...props }) => {
  const onClick = value => {
    filterBy(value);
  };

  return (
    <>
      <Input.Group compact>
        <Avatar
          shape="square"
          style={{
            color: "#353A40",
            backgroundColor: "#fafafa",
            border: "1px solid #D9D9D9",
            fontSize: 15,
            width: 70,
            verticalAlign: "middle"
          }}
        >
          수집방법
        </Avatar>
        <Select
          id="collect_type_nm"
          style={{ width: "130px", marginRight: 5}}
          onChange={onClick}
        >
          <Select.Option key="collect_type_nm" value="전체">
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

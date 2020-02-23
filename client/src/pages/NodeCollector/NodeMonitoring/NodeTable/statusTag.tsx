import React from "react";
import { Tag } from "antd";
import "antd/dist/antd.css";

const requestStatusMap = {
  CRS001: <Tag color="gold">대기</Tag>,
  CRS002: <Tag color="#FFCC00">진행</Tag>,
  CRS003: <Tag color="#12ABE2">완료</Tag>,
  CRS004: <Tag>취소</Tag>,
  CRS005: <Tag color="#FF0202">에러</Tag>,
  CRS006: <Tag color="gray">테스트</Tag>,
  complete: <Tag color="#12ABE2">완료</Tag>,
  working: <Tag color="#FFCC00">진행</Tag>,
  error: <Tag color="#FF0202">에러</Tag>
};

const requestProgressMap = {
  linkRequest: <div style={{ color: "#FFCC00" }}>linkRequest</div>,
  docRequest: <div style={{ color: "#FFCC00" }}>docRequest</div>,
  linkDocRequest: <div style={{ color: "#FFCC00" }}>linkDocRequest</div>,
  linkFinished: <div style={{ color: "#FFCC00" }}>linkFinished</div>,
  docFinished: <div style={{ color: "#12ABE2" }}>docFinished</div>,
  linkDocFinished: <div style={{ color: "#12ABE2" }}>linkDocFinished</div>,
  linkCollectError: <div style={{ color: "#FF0202" }}>linkCollectError</div>,
  docCollectError: <div style={{ color: "#FF0202" }}>docCollectError</div>,
  linkDocCollectError: (
    <div style={{ color: "#FF0202" }}>linkDocCollectError</div>
  )
};

export const StatusTag = ({ table, status }:{table:any; status:string}) => {
  if (table === "request") {
    return requestStatusMap[status];
  } else if (table === "progress") {
    return requestProgressMap[status];
  } else {
    return null;
  }
};

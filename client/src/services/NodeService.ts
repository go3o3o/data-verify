import axios from 'axios';
import { ApiResponse } from '~services/types';

export type RequestDto = {
  seq: number;
  customer_seq: number;
  channel_seq: number;
  type_cd: string;
  title: string;
  period: string;
  start_dt: string;
  end_dt: string;
  keyword: string;
  status: string;
  schedules: string;
  day_schedules: string;
  month_schedules: string;
  year_schedules: string;
  mode: string;
  reg_dt: string;
  upd_dt: string;
};

export type UpdateRequestDto = {
  seq: number;
  keyword: string;
  start_dt: string;
  end_dt: string;
  status: string;
};

export type CustomerDto = {
  seq: number;
  name: string;
};

export type ProgressDto = {
  seq: number;
  request_seq: number;
  progress_dt: string;
  start_dt: string;
  end_dt: string;
  status: string;
  error_msg: string;
  on_going_flag: string;
  reg_dt: string;
  upd_dt: string;
};

// const API_HOST = process.env.API_HOST || "http://61.82.137.194:8000";
const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class NodeService {
  async nodeData(kind: string): Promise<ApiResponse<RequestDto[]>> {
    return axios.post(`${API_HOST}/node/${kind}`);
  }

  async getCustomers(): Promise<ApiResponse<CustomerDto[]>> {
    return axios.post(`${API_HOST}/node/getCustomers`);
  }

  async nodeDetailData(
    request_seq: number,
  ): Promise<ApiResponse<ProgressDto[]>> {
    return axios.post(`${API_HOST}/node/nodeProgress/${request_seq}`);
  }

  async deleteRequest(request_seq: number) {
    return axios.delete(`${API_HOST}/node/${request_seq}`);
  }

  async deleteProgress(progress_seq: number) {
    return axios.delete(`${API_HOST}/node/${progress_seq}`);
  }

  async updateRequest(body: UpdateRequestDto) {
    return axios.patch(`${API_HOST}/node`, body);
  }
}

export default NodeService;

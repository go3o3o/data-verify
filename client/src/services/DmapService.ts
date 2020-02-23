import axios from 'axios';
import { ApiResponse } from '~services/types';

export type ProjectDto = {
  seq: number;
  customer_id: string;
  project_seq: number;
  keyword_seq: number;
  source_seq: number;
  depth1_seq: number;
  depth2_seq: number;
  depth3_seq: number;
  state: string;
  pub_day: string;
  pub_day_date: string;
  keyword: string;
};

export type ProgressDto = {
  seq: number;
  customer_id: string;
  project_seq: number;
  keyword_seq: number;
  source_seq: number;
  depth1_seq: number;
  depth2_seq: number;
  depth3_seq: number;
  state: number;
  pub_day: string;
  pub_day_date: string;
  keyword: string;
};

export type DocCheckDto = {
  seq: number;
  project_seq: number;
  keyword_seq: number;
  pub_day: string;
  pub_day_date: string;
  url: string;
  md5: string;
  reg_dt: string;
};

export type ChannelDto = {
  seq: number;
  name: string;
  source_depth: number;
  depth1_seq: number;
  depth2_seq: number;
  depth3_seq: number;
};

export type CustomerDto = {
  customer_id: string;
};

export type StatusDto = {
  seq: number;
  name: string;
  customer_id: string;
  state: number;
  cnt: number;
};

// const API_HOST = process.env.API_HOST || 'http://61.82.137.194:8000';
const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class DmapService {
  async dmapData(kind: string): Promise<ApiResponse<ProjectDto[]>> {
    return axios.post(`${API_HOST}/dmap/${kind}`);
  }
  async getSource(): Promise<ApiResponse<ChannelDto[]>> {
    return axios.post(`${API_HOST}/dmap/getSource`);
  }
  async getCustomers(): Promise<ApiResponse<CustomerDto[]>> {
    return axios.post(`${API_HOST}/dmap/getCustomers`);
  }

  async dmapDetailData(
    project_seq: number,
  ): Promise<ApiResponse<ProgressDto[]>> {
    return axios.post(`${API_HOST}/dmap/dmapProgress/${project_seq}`);
  }

  async docCheckData(project_seq: number): Promise<ApiResponse<DocCheckDto[]>> {
    return axios.post(`${API_HOST}/dmap/dmapStatus/${project_seq}`);
  }
}

export default DmapService;

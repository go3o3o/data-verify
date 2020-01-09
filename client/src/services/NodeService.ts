import axios from 'axios';
import { ApiResponse } from '~services/types';

export type NodeDto = {
  seq: number;
  customer_seq: number;
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

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class NodeService {
  async status(): Promise<ApiResponse<NodeDto[]>> {
    return axios.get(`${API_HOST}/node/status`);
  }

  async monitoring(): Promise<ApiResponse<NodeDto[]>> {
    return axios.get(`${API_HOST}/node/monitoring`);
  }
}

export default NodeService;

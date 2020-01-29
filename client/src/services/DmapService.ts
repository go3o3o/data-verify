import axios from 'axios';
import { ApiResponse } from '~services/types';

export type DmapDto = {
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

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class DmapService {
  async dmapData(kind: string): Promise<ApiResponse<DmapDto[]>> {
    return axios.post(`${API_HOST}/dmap/${kind}`);
  }
}

export default DmapService;

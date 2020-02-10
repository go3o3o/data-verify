import axios from 'axios';
import { ApiResponse } from '~services/types';
import { DetailDto } from './DataService';

export type DetailCountDto = {
  customer_id: string;
  always_yn: string;
};

export type CountDto = {
  seq: number;
  count: number;
  customer_id: string;
  channel: string;
  keyword: string;
  doc_datetime: string;
  collect_type: number;
  always_yn: string;
  reg_dt: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class CountService {
  async countData(): Promise<ApiResponse<CountDto[]>> {
    return axios.post(`${API_HOST}/count`);
  }

  async countDataByCustomerId(
    body: DetailCountDto,
  ): Promise<ApiResponse<CountDto[]>> {
    return axios.post(`${API_HOST}/count`, body);
  }
}

export default CountService;

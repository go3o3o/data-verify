import axios from 'axios';
import { ApiResponse } from '~services/types';

export type DetailDto = {
  customer_id: string;
  channel: string;
};

export type FilterDataDto = {
  customer_id: string;
  collect_type: string;
  doc_datetime: string;
};

export type DataDto = {
  seq: number;
  doc_title: string;
  doc_content: string;
  doc_writer: string;
  doc_url: string;
  customer_id: string;
  doc_datetime: string;
  channel: string;
  attach_yn: string;
  collect_type: number;
  always_yn: string;
  md5: string;
  reg_dt: string;
};

export type CustomerDto = {
  seq: number;
  name: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class DataService {
  async alwaysData(): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/always`);
  }

  async getAlwaysCustomers(): Promise<ApiResponse<CustomerDto[]>> {
    return axios.post(`${API_HOST}/data/always/getCustomers`);
  }

  async alwaysDataDetail(
    customer_id: string,
    channel: string,
  ): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/always/${customer_id}/${channel}`);
  }

  async retroactiveData(): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/retroactive`);
  }

  async getRetroactiveCustomers(): Promise<ApiResponse<CustomerDto[]>> {
    return axios.post(`${API_HOST}/data/retroactive/getCustomers`);
  }

  async retroactiveDataDetail(
    customer_id: string,
    channel: string,
  ): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/retroactive/${customer_id}/${channel}`);
  }
}

export default DataService;

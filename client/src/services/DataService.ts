import axios from 'axios';
import { ApiResponse } from '~services/types';

export type DetailDto = {
  customer_id: string;
  channel: string;
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

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class DataService {
  async alwaysData(): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/always`);
  }

  async alwaysDataDetail(body: DetailDto): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/always`, body);
  }

  async retroactiveData(): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/retroactive`);
  }

  async retroactiveDataDetail(
    body: DetailDto,
  ): Promise<ApiResponse<DataDto[]>> {
    return axios.post(`${API_HOST}/data/retroactive`, body);
  }

  async searchAlwaysData(
    customerId: string,
    collectType: string,
    docDatetime: string,
  ): Promise<ApiResponse<DataDto[]>> {
    return axios.post(
      `${API_HOST}/data/always/${customerId}/${collectType}/${docDatetime}`,
    );
  }

  async searchRetroactiveData(
    customerId: string,
    collectType: string,
    docDatetime: string,
  ): Promise<ApiResponse<DataDto[]>> {
    return axios.post(
      `${API_HOST}/data/retroactive/${customerId}/${collectType}/${docDatetime}`,
    );
  }
}

export default DataService;

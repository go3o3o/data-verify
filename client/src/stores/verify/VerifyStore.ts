import { action, observable, reaction, computed } from 'mobx';
import autobind from 'autobind-decorator';
import DataService, { DataDto, DetailDto } from '~services/DataService';
import CountService, { CountDto, DetailCountDto } from '~services/CountService';

export type Detail = {
  customer_id: string;
  channel: string;
};

@autobind
class VerifyStore {
  @observable detail: Detail | undefined;
  @observable customer_id = '';
  @observable channel = '';
  @observable always_yn = '';

  @observable data: DataDto[] = [];
  @observable detailData: DataDto[] = [];
  @observable count: CountDto[] = [];
  @observable customerCount: CountDto[] = [];

  private dataService = new DataService();
  private countService = new CountService();

  @action
  async alwaysData() {
    const response = await this.dataService.alwaysData();
    this.setData(response.data.data);
  }

  @action
  async alwaysDetailData() {
    const body: DetailDto = {
      customer_id: this.customer_id,
      channel: this.channel,
    };

    const response = await this.dataService.alwaysDataDetail(body);
    this.setDetailData(response.data.data);
    console.log('[verifyStore] detailData ' + this.detailData.length);
  }

  @action
  async retroactiveData() {
    const response = await this.dataService.retroactiveData();
    this.setData(response.data.data);
  }

  @action
  async retroactiveDetailData() {
    const body: DetailDto = {
      customer_id: this.customer_id,
      channel: this.channel,
    };
    const response = await this.dataService.retroactiveDataDetail(body);
    console.log(response.data.data);
    this.setData(response.data.data);
  }

  @action
  async searchAlwaysData(
    customerId: string,
    collectType: string,
    docDatetime: string,
  ) {
    const response = await this.dataService.searchAlwaysData(
      customerId,
      collectType,
      docDatetime,
    );
    this.setData(response.data.data);
  }

  @action
  async searchRetroactiveData(
    customerId: string,
    collectType: string,
    docDatetime: string,
  ) {
    const response = await this.dataService.searchRetroactiveData(
      customerId,
      collectType,
      docDatetime,
    );
    console.log(response.data.data);
    this.setData(response.data.data);
  }

  @action
  async countData() {
    const response = await this.countService.countData();
    this.setCountData(response.data.data);
  }

  @action
  async countDataByCustomerId() {
    const body: DetailCountDto = {
      customer_id: this.customer_id,
      always_yn: this.always_yn,
    };

    const response = await this.countService.countDataByCustomerId(body);
    // console.log(response.data.data);
    this.setCustomerCountData(response.data.data);
  }

  @action
  setCustomerId(customer_id: string) {
    this.customer_id = customer_id;
  }

  @action
  setChannel(channel: string) {
    this.channel = channel;
  }
  @action
  setAlwaysYn(always_yn: string) {
    this.always_yn = always_yn;
  }

  @action
  setData(data: DataDto[]) {
    this.data = data;
  }

  @action
  setDetailData(detailData: DataDto[]) {
    this.detailData = detailData;
  }

  @action
  setCountData(count: CountDto[]) {
    this.count = count;
  }

  @action
  setCustomerCountData(customerCount: CountDto[]) {
    this.customerCount = customerCount;
  }
}

export default VerifyStore;

import { action, observable, reaction, computed } from 'mobx';
import autobind from 'autobind-decorator';
import DataService, { DataDto, CustomerDto } from '~services/DataService';
import CountService, { CountDto } from '~services/CountService';

@autobind
class VerifyStore {
  @observable customer_id = '';
  @observable channel = '';
  @observable always_yn = '';

  @observable data: DataDto[] = [];
  @observable detailData: DataDto[] = [];
  @observable customers: CustomerDto[] = [];
  @observable count: CountDto[] = [];
  @observable customerCount: CountDto[] = [];

  private dataService = new DataService();
  private countService = new CountService();

  @action
  async alwaysData() {
    const alwaysData = await this.dataService.alwaysData();
    const customerIds = await this.dataService.getAlwaysCustomers();
    this.setData(alwaysData.data.data);
    this.setCustomers(customerIds.data.data);
  }

  @action
  async alwaysDetailData(customer_id: string, channel: string) {
    
    const alwaysDetailData = await this.dataService.alwaysDataDetail(
      customer_id,
      channel,
    );
    return alwaysDetailData;
  }

  @action
  async retroactiveData() {
    const retroactiveData = await this.dataService.retroactiveData();
    const customerIds = await this.dataService.getRetroactiveCustomers();
    this.setData(retroactiveData.data.data);
    this.setCustomers(customerIds.data.data);
  }

  @action
  async retroactiveDetailData(customer_id: string, channel: string) {
    const retroactiveDetailData = await this.dataService.retroactiveDataDetail(
      customer_id,
      channel,
    );
    return retroactiveDetailData;
  }

  @action
  async countData() {
    const response = await this.countService.countData();
    this.setCountData(response.data.data);
  }

  @action
  async countDataByCustomerId(customer_id: string, always_yn: string) {
    const countDataByCustomerId = await this.countService.countDataByCustomerId(
      customer_id,
      always_yn,
    );
    return countDataByCustomerId;
  }

  @action
  setChannel(channel: string) {
    this.channel = channel;
  }
  @action
  setCustomerId(customer_id: string) {
    this.customer_id = customer_id;
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
  async setCustomers(customers: CustomerDto[]) {
    this.customers = customers;
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

import React, { Component } from 'react';

import { Form } from 'antd';

import { DmapTable } from './DmapTable';
import { FilterSearch } from './FilterSearch';
import { FilterUseYn } from './FilterUseYn';
import { FilterCustomer } from './FilterCustomer';

type InjectedProps = {
  monitoringData: any;
  sourceData: any;
  customerData: any;
};

class DmapMonitoring extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);

    this.props.monitoringData.map(md => {
      md['filterCustomer'] = true;
      md['filterSource'] = true;
      md['filterStatus'] = true;
      md['bicaInfo'] = {
        ip: md['bica_ip'],
        port: md['bica_port'],
        conceptId: md['bica_concept_id'],
      };
    });
    var filteredEvents = this.props.monitoringData.filter(data => {
      return data.use_yn === 'Y';
    });

    this.state = {
      dmap: filteredEvents,
      source: this.props.sourceData,
      customers: this.props.customerData,
    };
  }

  handleFilterUseYn = (value: string) => {
    var filteredEvents = [];
    if (value === 'all') {
      filteredEvents = this.props.monitoringData;
    } else {
      filteredEvents = this.props.monitoringData.filter((data: any) => {
        return data.use_yn === value;
      });
    }

    this.setState({
      dmap: filteredEvents,
    });
  };

  handleFilterCustomer = (value: string) => {
    var filteredEvents = [];
    if (value === 'all') {
      filteredEvents = this.props.monitoringData.filter((data: any) => {
        data.filterCustomer = true;
        return data.filterCustomer === true && data.filterStatus === true;
      });
    } else {
      filteredEvents = this.props.monitoringData.filter((data: any) => {
        if (data.customer_id === value) {
          data.filterCustomer = true;
        } else {
          data.filterCustomer = false;
        }
        return data.filterCustomer === true && data.filterStatus === true;
      });
    }
    this.setState({
      dmap: filteredEvents,
    });
  };

  handleSearch = (searchText: string) => {
    var filteredEvents = this.props.monitoringData.filter((data: any) => {
      // console.log(name);
      return (
        data.name.includes(searchText) &&
        data.filterCustomer === true &&
        data.filterStatus === true
      );
    });
    this.setState({
      dmap: filteredEvents,
    });
  };

  render() {
    return (
      <>
        <Form layout="inline" style={{ textAlign: 'left', marginBottom: 25 }}>
          <Form.Item>
            <FilterUseYn filterBy={this.handleFilterUseYn} />
          </Form.Item>
          <Form.Item>
            <FilterCustomer
              filterBy={this.handleFilterCustomer}
              customers={this.state['customers']}
            />
          </Form.Item>

          <Form.Item>
            <FilterSearch onSearch={this.handleSearch} />
          </Form.Item>
        </Form>
        <DmapTable eventsData={this.state['dmap']} />
      </>
    );
  }
}

export default DmapMonitoring;

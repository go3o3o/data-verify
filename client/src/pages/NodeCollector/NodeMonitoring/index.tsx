import React, { Component } from 'react';

import { Form } from 'antd';

import { NodeTable } from './NodeTable';
import { FilterCustomer } from './FilterCustomer';
import { FilterStatus } from './FilterStatus';
import { FilterSearch } from './FilterSearch';

type InjectedProps = {
  monitoringData: any;
  customerData: any;
};

class NodeMonitoring extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);

    this.props.monitoringData.map(md => {
      md['filterCustomer'] = true;
      md['filterStatus'] = true;
    });
    this.state = {
      node: this.props.monitoringData,
      customers: this.props.customerData,
    };
  }

  handleFilterStatus = value => {
    var filteredEvents = [];
    if (value === 'all') {
      filteredEvents = this.props.monitoringData.filter(data => {
        data.filterStatus = true;
        return data.filterCustomer === true && data.filterStatus === true;
      });
    } else {
      filteredEvents = this.props.monitoringData.filter(data => {
        if (data.status === value) {
          data.filterStatus = true;
        } else {
          data.filterStatus = false;
        }
        return data.filterCustomer === true && data.filterStatus === true;
      });
    }

    this.setState({
      node: filteredEvents,
    });
  };

  handleFilterCustomer = value => {
    var filteredEvents = [];
    if (value === 'all') {
      filteredEvents = this.props.monitoringData.filter(data => {
        data.filterCustomer = true;
        return data.filterCustomer === true && data.filterStatus === true;
      });
    } else {
      filteredEvents = this.props.monitoringData.filter(data => {
        if (data.customer_id === value) {
          data.filterCustomer = true;
        } else {
          data.filterCustomer = false;
        }
        return data.filterCustomer === true && data.filterStatus === true;
      });
    }

    this.setState({
      node: filteredEvents,
    });
  };

  handleSearch = searchText => {
    var filteredEvents = this.props.monitoringData.filter(
      ({ channel, title, keyword }) => {
        // console.log(channel, title, keyword);
        if (keyword !== null) {
          return (
            channel.includes(searchText) ||
            title.includes(searchText) ||
            keyword.includes(searchText)
          );
        } else {
          return channel.includes(searchText) || title.includes(searchText);
        }
      },
    );

    this.setState({
      node: filteredEvents,
    });
  };

  render() {
    return (
      <>
        <Form layout="inline" style={{ textAlign: 'left', marginBottom: 25 }}>
          <Form.Item>
            <FilterCustomer
              filterBy={this.handleFilterCustomer}
              customers={this.state['customers']}
            />
          </Form.Item>
          <Form.Item>
            <FilterStatus filterBy={this.handleFilterStatus} />
          </Form.Item>

          <Form.Item>
            <FilterSearch onSearch={this.handleSearch} />
          </Form.Item>
        </Form>
        <NodeTable eventsData={this.state['node']} />
      </>
    );
  }
}
export default NodeMonitoring;
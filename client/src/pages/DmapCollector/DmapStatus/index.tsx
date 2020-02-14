import React, { Component } from 'react';
import { Async } from 'react-async';

import { Button } from 'reactstrap';
import { Card, Icon, Form } from 'antd';

import { FilterCustomer } from './FilterCustomer';
import { FilterSearch } from './FilterSearch';
import DmapProgress from './DmapProgress';
import DmapDocCheck from './DmapDocCheck';

type InjectedProps = {
  statusData: any;
  customerData: any;
};

class DmapStatus extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);

    var project_set = new Set();
    var project_arr: object[] = [];
    var json = {};
    this.props.statusData.map(data => {
      if (project_set.has(data.name)) {
        json[data.status] = data.cnt;
      } else {
        project_set.add(data.name);
        if (Object.keys(json).length !== 0) {
          project_arr.push(json);
        }
        json = {};
        json['seq'] = data.seq;
        json['name'] = data.name;
        json['customer_id'] = data.customer_id;
        json['filterCustomer'] = true;
        json[data.status] = data.cnt;
      }
    });
    // console.log(project_arr);
    this.state = {
      project: project_arr,
      data: project_arr,
      customers: this.props.customerData,
      viewComplete: true,
      viewWorking: true,
      viewError: true,
      selectProject: {},
    };
  }

  buttonClick = (e: any) => {
    const progressButton = e.target.id;

    if (progressButton === 'complete') {
      this.setState({ viewComplete: !this.state['viewComplete'] });
    } else if (progressButton === 'working') {
      this.setState({ viewWorking: !this.state['viewWorking'] });
    } else if (progressButton === 'error') {
      this.setState({ viewError: !this.state['viewError'] });
    }
  };

  projectClick = (seq: number, name: string) => {
    const project = { seq: seq, name: name };
    this.setState({ selectProject: project });
  };

  handleFilterCustomer = value => {
    var filteredEvents = [];
    if (value === 'all') {
      filteredEvents = this.state['data'].filter(data => {
        data['filterCustomer'] = true;
        return data['filterCustomer'] === true;
      });
    } else {
      filteredEvents = this.state['data'].filter(data => {
        if (data['customer_id'] === value) {
          data['filterCustomer'] = true;
        } else {
          data.filterCustomer = false;
        }
        return data['filterCustomer'] === true;
      });
    }

    this.setState({
      project: filteredEvents,
    });
  };

  handleSearch = searchText => {
    var filteredEvents = this.state['data'].filter(({ name, customer_id }) => {
      return name.includes(searchText) || customer_id.includes(searchText);
    });

    this.setState({
      project: filteredEvents,
    });
  };

  render() {
    return (
      <>
        <Form layout="inline" style={{ textAlign: 'left', marginBottom: 30 }}>
          <Form.Item>
            <FilterCustomer
              filterBy={this.handleFilterCustomer}
              customers={this.props.customerData}
            />
          </Form.Item>

          <Form.Item>
            <FilterSearch onSearch={this.handleSearch} />
          </Form.Item>
        </Form>

        <Card
          style={{
            width: '49%',
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 20,
          }}
        >
          <p
            style={{
              textAlign: 'left',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            프로젝트별 수집 현황
            <a id="progress">
              {/* <Icon
                type="reload"
                style={{ verticalAlign: 'middle', marginLeft: 5 }}
              /> */}
            </a>
          </p>
          {this.state['project'].map(data => (
            <DmapProgress
              project={data}
              projectClick={this.projectClick}
              viewComplete={this.state['viewComplete']}
              viewWorking={this.state['viewWorking']}
              viewError={this.state['viewError']}
            />
          ))}
          <div style={{ marginTop: 10 }}>
            <Button
              outline={this.state['viewComplete'] ? false : true}
              id="complete"
              color="primary"
              style={{
                height: '20px',
                width: '30px',
                padding: 0,
                margin: 5,
              }}
              onClick={this.buttonClick}
            >
              <p id="complete" style={{ fontSize: 10 }}>
                완료
              </p>
            </Button>
            <Button
              outline={this.state['viewWorking'] ? false : true}
              id="working"
              color="warning"
              style={{
                height: '20px',
                width: '30px',
                padding: 0,
                margin: 5,
              }}
              onClick={this.buttonClick}
            >
              <p id="working" style={{ fontSize: 10 }}>
                진행
              </p>
            </Button>
            <Button
              outline={this.state['viewError'] ? false : true}
              id="error"
              color="danger"
              style={{
                height: '20px',
                width: '30px',
                padding: 0,
                margin: 5,
              }}
              onClick={this.buttonClick}
            >
              <p id="error" style={{ fontSize: 10 }}>
                에러
              </p>
            </Button>
          </div>
        </Card>
        <Card
          style={{
            width: '49%',
            display: 'inline-block',
            verticalAlign: 'top',
          }}
        >
          <DmapDocCheck project={this.state['selectProject']} />
        </Card>
      </>
    );
  }
}

export default DmapStatus;

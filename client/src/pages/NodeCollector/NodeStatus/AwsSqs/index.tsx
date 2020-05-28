import React, { Component } from 'react';
import { Async } from 'react-async';
import aws from 'aws-sdk';

import { Table, Spin } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { config } from '~assets/config';

type InjectedProps = {
  reload: number;
};

const region = config.region;
const accessKeyId = config.access_key_id;
const secretAccessKey = config.secret_access_key;
aws.config.update({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

class AwsSqs extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);
    this.loadSqsList = this.loadSqsList.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.reload !== nextProps.reload || this.props.reload === 0) {
      this.loadSqsList();
    }
  }

  delay = () => {
    return new Promise(resolve => setTimeout(resolve, 2500));
  };

  getSqsList = async () => {
    const sqs = new aws.SQS();
    const params = {
      QueueNamePrefix: 'dmap',
    };
    var queueList: object[] = [];
    console.log(aws.config);
    sqs.listQueues(params, function(data: any) {
      var json = {};
      console.log(data);
      if (data.QueueUrls !== undefined) {
        data.QueueUrls.forEach((queueUrl: string) => {
          console.log(queueUrl);
          const urlParams = { QueueUrl: queueUrl, AttributeNames: ['All'] };
          var json = {};
          sqs.getQueueAttributes(urlParams, function(data: any) {
            if (data.Attributes !== undefined) {
              // queueList.push(data.Attributes);
              var queryUrl = String(queueUrl).substring(
                String(queueUrl).indexOf('dmap'),
              );
              json['queryUrl'] = queryUrl;
              json['msgQueue'] = data.Attributes.ApproximateNumberOfMessages;
              json['msgDelay'] =
                data.Attributes.ApproximateNumberOfMessagesDelayed;
              json['msgMove'] =
                data.Attributes.ApproximateNumberOfMessagesNotVisible;
            }
            queueList.push(json);
          });
        });
      }
    });
    await this.delay();
    return queueList;
  };

  loadSqsList = async () => {
    var result = this.getSqsList();
    // console.log(result);
    return result;
  };

  render() {
    const columns: ColumnProps<any>[] = [
      { title: 'URL', dataIndex: 'queryUrl', key: 'queryUrl', width: '50%' },
      {
        title: '큐 사이즈',
        dataIndex: 'msgQueue',
        key: 'msgQueue',
        sorter: (a, b) => a.msgQueue - b.msgQueue,
        defaultSortOrder: 'descend',
      },
      {
        title: '대기 사이즈',
        dataIndex: 'msgDelay',
        key: 'msgDelay',
        sorter: (a, b) => a.msgDelay - b.msgDelay,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '이동 사이즈',
        dataIndex: 'msgMove',
        key: 'msgMove',
        sorter: (a, b) => a.msgMove - b.msgMove,
        sortDirections: ['descend', 'ascend'],
      },
    ];

    return (
      <Async promiseFn={this.loadSqsList}>
        <Async.Loading>
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <Spin size="large" />
          </div>
        </Async.Loading>
        <Async.Resolved>
          {data => {
            return (
              <Table
                size="small"
                columns={columns}
                dataSource={Object.assign(data)}
              />
            );
          }}
         </Async.Resolved> 
      </Async>
    );
  }
}

export default AwsSqs;

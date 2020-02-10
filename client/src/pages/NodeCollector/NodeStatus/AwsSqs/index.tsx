import React, { Component } from 'react';
import aws from 'aws-sdk';

import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import { ColumnProps } from 'antd/lib/table';

type InjectedProps = {
  reload: number;
};

class AwsSqs extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);

    aws.config.update({
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
    });

    this.state = {
      queueList: undefined,
      loading: false,
    };

    this.loadSqsList = this.loadSqsList.bind(this);
  }
  componentWillMount() {
    this.loadSqsList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reload !== nextProps.reload || this.props.reload === 0) {
      this.loadSqsList();
    }
  }

  loadSqsList = () => {
    const sqs = new aws.SQS();
    const params = {
      QueueNamePrefix: 'dmap',
    };
    var queueList: any[] = [];

    sqs.listQueues(
      params,
      function(err, data) {
        if (data.QueueUrls !== undefined) {
          data.QueueUrls.forEach(url => {
            const urlParams = { QueueUrl: url, AttributeNames: ['All'] };
            var json = {};
            sqs.getQueueAttributes(urlParams, function(err, data) {
              if (data.Attributes !== undefined) {
                var queryUrl = String(url).substring(
                  String(url).indexOf('dmap'),
                );
                json['queryUrl'] = queryUrl;
                json['msgSize'] = Number(
                  data.Attributes.ApproximateNumberOfMessages,
                );
                json['msgDlayed'] =
                  data.Attributes.ApproximateNumberOfMessagesDelayed;
                json['msgNotVisible'] =
                  data.Attributes.ApproximateNumberOfMessagesNotVisible;
              }
            });
            queueList.push(json);
          });
          this.setState({ loading: true });
          this.setState({ queueList });
        }
      }.bind(this),
    );
  };

  render() {
    // console.log(this.state['queueList']);
    const columns: ColumnProps<any>[] = [
      { title: 'URL', dataIndex: 'queryUrl', key: 'queryUrl' },
      {
        title: '큐 사이즈',
        dataIndex: 'msgSize',
        key: 'msgSize',
        sorter: (a, b) => a.msgSize - b.msgSize,
        sortDirections: ['descend'],
      },
      {
        title: '대기 사이즈',
        dataIndex: 'msgDlayed',
        key: 'msgDlayed',
        sorter: (a, b) => a.msgDlayed - b.msgDlayed,
        sortDirections: ['descend'],
      },
      {
        title: '이동 사이즈',
        dataIndex: 'msgNotVisible',
        key: 'msgNotVisible',
        sorter: (a, b) => a.msgNotVisible - b.msgNotVisible,
        sortDirections: ['descend'],
      },
    ];

    return this.state['loading'] ? (
      <>
        {/* {console.log(this.state['queueList'])} */}
        <Table
          size="small"
          columns={columns}
          dataSource={this.state['queueList']}
        />
      </>
    ) : (
      <Spin />
    );
  }
}

export default AwsSqs;

import React, { useEffect } from 'react';

import { inject, observer } from 'mobx-react';

import { Table } from 'antd';
import 'antd/dist/antd.css';

import { STORES } from '~constants';
import VerifyStore from '~stores/verify/VerifyStore';

type InjectedProps = {
  verifyStore: VerifyStore;
  customer_id: string;
  always_yn: string;
};

function DetailCount(props: InjectedProps) {
  useEffect(() => {
    props.verifyStore.setCustomerId(props.customer_id);
    props.verifyStore.setAlwaysYn(props.always_yn);
    props.verifyStore.countDataByCustomerId();
  }, []);

  const { customerCount } = props.verifyStore;

  const today = new Date('2020-01-14');

  const theYear = today.getFullYear();
  const theMonth = today.getMonth();
  const theDate = today.getDate();

  var weeks: string[] = [];
  var retroWeeks: string[] = [];

  if (props.always_yn === 'Y') {
    for (var i = 0; i < 7; i++) {
      var resultDay = new Date(theYear, theMonth, theDate - i);
      var yyyy = resultDay.getFullYear();

      var mm = Number(resultDay.getMonth()) + 1;
      var dd = resultDay.getDate();

      var mm_str = '';
      var dd_str = '';

      mm_str = String(mm).length === 1 ? '0' + mm : String(mm);
      dd_str = String(dd).length === 1 ? '0' + dd : String(dd);
      weeks.push(`${yyyy}-${mm_str}-${dd_str}`);
    }
  } else if (props.always_yn === 'N') {
    for (var i = 0; i < 8; i++) {
      var resultDay = new Date(theYear, theMonth - i * 3, theDate);
      var yyyy = resultDay.getFullYear();

      var mm = Number(resultDay.getMonth()) + 1;
      var dd = resultDay.getDate();

      var q = Math.floor((resultDay.getMonth() + 3) / 3);

      var mm_str = '';
      var dd_str = '';

      mm_str = String(mm).length === 1 ? '0' + mm : String(mm);
      dd_str = String(dd).length === 1 ? '0' + dd : String(dd);
      retroWeeks.push(`${yyyy}-${mm_str}-${dd_str}`);
      weeks.push(`${yyyy}.${q}Q`);
    }
  }

  console.log(retroWeeks);

  var parsingCheck = new Set();
  var resultCheck = new Set();
  customerCount.map(c => {
    parsingCheck.add(`${c.channel}&&${c.keyword}`);
    resultCheck.add(c.channel);
  });

  var parseData: any[] = [];
  if (props.always_yn === 'Y') {
    parsingCheck.forEach(pc => {
      var checkChannel = pc.split('&&')[0];
      var checkKeyword = pc.split('&&')[1];

      var parseJson = {};
      var count0 = 0;
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      var count4 = 0;
      var count5 = 0;
      var count6 = 0;

      customerCount.map(c => {
        if (checkChannel === c.channel && checkKeyword === c.keyword) {
          // console.log(checkChannel, checkKeyword, c.doc_datetime);
          parseJson['seq'] = c.seq;
          parseJson['channel'] = c.channel;
          parseJson['keyword'] = c.keyword;
          if (weeks[0] === c.doc_datetime) {
            count0 = Number(c.count);
          } else if (weeks[1] === c.doc_datetime) {
            count1 = Number(c.count);
          } else if (weeks[2] === c.doc_datetime) {
            count2 = Number(c.count);
          } else if (weeks[3] === c.doc_datetime) {
            count3 = Number(c.count);
          } else if (weeks[4] === c.doc_datetime) {
            count4 = Number(c.count);
          } else if (weeks[5] === c.doc_datetime) {
            count5 = Number(c.count);
          } else if (weeks[6] === c.doc_datetime) {
            count6 = Number(c.count);
          }
          parseJson[weeks[0]] = count0;
          parseJson[weeks[1]] = count1;
          parseJson[weeks[2]] = count2;
          parseJson[weeks[3]] = count3;
          parseJson[weeks[4]] = count4;
          parseJson[weeks[5]] = count5;
          parseJson[weeks[6]] = count6;
        }
      });
      parseData.push(parseJson);
    });
  } else if (props.always_yn === 'N') {
    parsingCheck.forEach(pc => {
      var checkChannel = pc.split('&&')[0];
      var checkKeyword = pc.split('&&')[1];

      var parseJson = {};
      var count0 = 0;
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      var count4 = 0;
      var count5 = 0;
      var count6 = 0;

      customerCount.map(c => {
        if (checkChannel === c.channel && checkKeyword === c.keyword) {
          parseJson['seq'] = c.seq;
          parseJson['channel'] = c.channel;
          parseJson['keyword'] = c.keyword;
          if (
            retroWeeks[1] < c.doc_datetime &&
            retroWeeks[0] >= c.doc_datetime
          ) {
            count0 = Number(c.count);
          } else if (
            retroWeeks[2] < c.doc_datetime &&
            retroWeeks[1] >= c.doc_datetime
          ) {
            count1 = Number(c.count);
          } else if (
            retroWeeks[3] < c.doc_datetime &&
            retroWeeks[2] >= c.doc_datetime
          ) {
            count2 = Number(c.count);
          } else if (
            retroWeeks[4] < c.doc_datetime &&
            retroWeeks[3] >= c.doc_datetime
          ) {
            count3 = Number(c.count);
          } else if (
            retroWeeks[5] <= c.doc_datetime &&
            retroWeeks[4] > c.doc_datetime
          ) {
            count4 = Number(c.count);
          } else if (
            retroWeeks[6] <= c.doc_datetime &&
            retroWeeks[5] > c.doc_datetime
          ) {
            count5 = Number(c.count);
          } else if (
            retroWeeks[7] <= c.doc_datetime &&
            retroWeeks[6] > c.doc_datetime
          ) {
            count6 = Number(c.count);
          }
          parseJson[weeks[0]] = count0;
          parseJson[weeks[1]] = count1;
          parseJson[weeks[2]] = count2;
          parseJson[weeks[3]] = count3;
          parseJson[weeks[4]] = count4;
          parseJson[weeks[5]] = count5;
          parseJson[weeks[6]] = count6;
        }
      });
      parseData.push(parseJson);
    });
  }

  var resultData: any[] = [];
  var resultJson = {};
  var childData: any[] = [];
  var childJson = {};
  resultCheck.forEach(rc => {
    var motherChannel = rc;
    childData = [];
    resultJson = {};
    resultJson['list'] = '';
    resultJson['channel'] = motherChannel;

    var count0 = 0;
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;
    var count6 = 0;

    for (var i = 0; i < parseData.length; i++) {
      childJson = {};
      if (motherChannel === parseData[i].channel) {
        // console.log(motherChannel, parseData[i].channel, parseData[i].keyword);
        childJson['key'] = parseData[i].seq;
        childJson['channel'] = parseData[i].keyword;
        childJson[weeks[0]] = parseData[i][weeks[0]];
        childJson[weeks[1]] = parseData[i][weeks[1]];
        childJson[weeks[2]] = parseData[i][weeks[2]];
        childJson[weeks[3]] = parseData[i][weeks[3]];
        childJson[weeks[4]] = parseData[i][weeks[4]];
        childJson[weeks[5]] = parseData[i][weeks[5]];
        childJson[weeks[6]] = parseData[i][weeks[6]];

        count0 += parseData[i][weeks[0]];
        count1 += parseData[i][weeks[1]];
        count2 += parseData[i][weeks[2]];
        count3 += parseData[i][weeks[3]];
        count4 += parseData[i][weeks[4]];
        count5 += parseData[i][weeks[5]];
        count6 += parseData[i][weeks[6]];

        childData.push(childJson);
      }
    }
    resultJson[weeks[0]] = count0;
    resultJson[weeks[1]] = count1;
    resultJson[weeks[2]] = count2;
    resultJson[weeks[3]] = count3;
    resultJson[weeks[4]] = count4;
    resultJson[weeks[5]] = count5;
    resultJson[weeks[6]] = count6;

    resultJson['children'] = childData;
    resultData.push(resultJson);
  });

  const columns = [
    { title: '', datIndex: 'list', key: 'list', width: '3%' },
    {
      title: '수집채널',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: weeks[6].replace(/-/g, '.').substring(2),
      dataIndex: weeks[6],
      key: weeks[6],
    },
    {
      title: weeks[5].replace(/-/g, '.').substring(2),
      dataIndex: weeks[5],
      key: weeks[5],
    },
    {
      title: weeks[4].replace(/-/g, '.').substring(2),
      dataIndex: weeks[4],
      key: weeks[4],
    },
    {
      title: weeks[3].replace(/-/g, '.').substring(2),
      dataIndex: weeks[3],
      key: weeks[3],
    },
    {
      title: weeks[2].replace(/-/g, '.').substring(2),
      dataIndex: weeks[2],
      key: weeks[2],
    },
    {
      title: weeks[1].replace(/-/g, '.').substring(2),
      dataIndex: weeks[1],
      key: weeks[1],
    },
    {
      title: weeks[0].replace(/-/g, '.').substring(2),
      dataIndex: weeks[0],
      key: weeks[0],
    },
  ];

  return <Table size="small" columns={columns} dataSource={resultData} bordered />;
}

export default inject(STORES.VERIFY_STORE)(observer(DetailCount));

import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Table, Form } from 'antd';

import { STORES } from '~constants';

import { FilterSearch } from '../FilterSearch';
import { FilterCollectType } from '../FilterCollectType';
import { AnyARecord } from 'dns';

type InjectedProps = {
  countDataByCustomerId: any;
  always_yn: string;
};

function DetailCount(props: InjectedProps) {
  const [countDataByCustomerId, setCountDataByCustomerId] = useState(
    props.countDataByCustomerId,
  );

  var handleSearch = (searchText: string) => {
    var filteredEvents = props.countDataByCustomerId.filter(
      ({ channel }: { channel: string }) => {
        return channel.includes(searchText);
      },
    );
    setCountDataByCustomerId(filteredEvents);
  };

  var handleCollectType = (value: string) => {
    if (value === '디맵수집기') {
      var filteredEvents = props.countDataByCustomerId.filter(
        ({ collect_type }: { collect_type: string }) => {
          return collect_type === '0';
        },
      );
    } else if (value === '신규수집기') {
      var filteredEvents = props.countDataByCustomerId.filter(
        ({ collect_type }: { collect_type: string }) => {
          return collect_type === '1';
        },
      );
    } else if (value === '전체') {
      var filteredEvents = props.countDataByCustomerId;
    }
    setCountDataByCustomerId(filteredEvents);
  };

  const today = new Date();

  const theYear = today.getFullYear();
  const theMonth = today.getMonth();
  const theDate = today.getDate();

  var weeks: string[] = [];
  var retroWeeks: string[] = [];

  // Table Header 부분의 날짜 파싱: 상시수집 데이터 - 일주일, 소급수집 데이터 - 7분기
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

  var parsingCheck = new Set();
  var resultCheck = new Set();
  countDataByCustomerId.map((c: any) => {
    parsingCheck.add(`${c.channel}&&${c.keyword}`);
    resultCheck.add(c.channel);
  });

  // mother row 만들기
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

      countDataByCustomerId.map((c: any) => {
        if (
          checkChannel === c.channel &&
          (checkKeyword === 'null' ? true : checkKeyword === c.keyword)
        ) {
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

      countDataByCustomerId.map((c: any) => {
        if (
          checkChannel === c.channel &&
          (checkKeyword === 'null' ? true : checkKeyword === c.keyword)
        ) {
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
  // mother row 에 맞는 child row 붙이기
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

  return (
    <>
      <Form layout="inline" style={{ textAlign: 'left', marginBottom: 10 }}>
        <Form.Item>
          <FilterCollectType filterBy={handleCollectType} />
        </Form.Item>
        <Form.Item>
          <FilterSearch onSearch={handleSearch} />
        </Form.Item>
      </Form>
      <Table size="small" columns={columns} dataSource={resultData} bordered />
    </>
  );
}

export default inject(STORES.VERIFY_STORE)(observer(DetailCount));

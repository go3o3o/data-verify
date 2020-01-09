import * as React from 'react';
import { Link } from 'react-router-dom';

import { PAGE_PATHS } from '~constants';

function TopBar() {
  return (
    <div>
      <Link to={PAGE_PATHS.NODE}>
        <i className="menu">신규수집기</i>
      </Link>
      <Link to={PAGE_PATHS.DMAP}>
        <i className="menu">디맵수집기</i>
      </Link>
      <Link to={PAGE_PATHS.COLLECT_COUNT}>
        <i className="menu">수집건수</i>
      </Link>
      <Link to={PAGE_PATHS.COLLECT_ALWAYS}>
        <i className="menu">상시수집</i>
      </Link>
      <Link to={PAGE_PATHS.COLLECT_RETROACTIVE}>
        <i className="menu">소급수집</i>
      </Link>
    </div>
  );
}

export default TopBar;

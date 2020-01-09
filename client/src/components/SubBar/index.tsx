import * as React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '~constants';

function SubBar() {
  return (
    <div>
      <Link to={`${PAGE_PATHS.NODE}/status`}>
        <i className="submenu">현황</i>
      </Link>
      <Link to={`${PAGE_PATHS.NODE}/monitoring`}>
        <i className="submenu">모니터링</i>
      </Link>
    </div>
  );
}

export default SubBar;

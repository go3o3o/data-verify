import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

import Header from '~components/TopBar';

function CollectCount() {
  return (
    <>
      <Header />
      <div>수집건수</div>
    </>
  );
}

export default CollectCount;
